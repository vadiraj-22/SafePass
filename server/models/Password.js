import mongoose from 'mongoose';
import { encrypt, decrypt, isEncrypted } from '../utils/encryption.js';

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  website: {
    type: String,
    required: [true, 'Website is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
passwordSchema.pre('save', function (next) {
  this.updatedAt = Date.now();

  // Only encrypt if password is modified and not already encrypted
  if (this.isModified('password') && !isEncrypted(this.password)) {
    try {
      this.password = encrypt(this.password);
    } catch (error) {
      return next(error);
    }
  }

  next();
});

// Decrypt password when converting to JSON (for API responses)
passwordSchema.methods.toJSON = function () {
  const obj = this.toObject();

  // Decrypt password for client
  if (obj.password && isEncrypted(obj.password)) {
    try {
      obj.password = decrypt(obj.password);
    } catch (error) {
      console.error('Error decrypting password:', error);
      obj.password = '[Decryption Error]';
    }
  }

  return obj;
};

export default mongoose.model('Password', passwordSchema);
