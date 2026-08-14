import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import { sendEmail } from '../utils/sendEmail.js';
import { isStrongPassword, PASSWORD_REQUIREMENTS_MSG } from '../utils/passwordValidator.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    // Validate strong password rules
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: PASSWORD_REQUIREMENTS_MSG });
    }

    // Create user (defaults: twoFactorEnabled: false)
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login - Step 1: Validate credentials & check if 2-Step Verification is enabled
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If 2-Step Verification (2FA) is enabled for this user, dispatch OTP to email
    if (user.twoFactorEnabled) {
      const otp = generateOtp();
      user.emailVerificationOtp = otp;
      user.emailVerificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();

      // Dispatch email
      await sendEmail({
        to: user.email,
        subject: 'SafePass Login Verification Code',
        otp,
        type: 'login_verification'
      });

      return res.json({
        requiresOtp: true,
        email: user.email,
        message: '2-Step Verification OTP sent to your email address'
      });
    }

    // If 2FA is NOT enabled, issue token directly
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login - Step 2: Verify login OTP & issue token
router.post('/verify-login-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (
      !user.emailVerificationOtp ||
      user.emailVerificationOtp !== otp ||
      !user.emailVerificationOtpExpires ||
      user.emailVerificationOtpExpires < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' });
    }

    // Mark as verified & clear OTP
    user.isVerified = true;
    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpires = null;
    await user.save();

    // Issue JWT token
    const token = generateToken(user._id);

    res.json({
      message: 'Login verified successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resend Login Verification OTP
router.post('/resend-login-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOtp();
    user.emailVerificationOtp = otp;
    user.emailVerificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'SafePass Login Verification Code',
      otp,
      type: 'login_verification'
    });

    res.json({ message: 'A new verification OTP has been sent to your email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request Reset Password OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: 'If an account with that email exists, a reset OTP has been sent.'
      });
    }

    const otp = generateOtp();
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'SafePass Password Reset Verification',
      otp,
      type: 'password_reset'
    });

    res.json({ message: 'Password reset OTP sent to your email address' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset Password using OTP
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: PASSWORD_REQUIREMENTS_MSG });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (
      !user.resetPasswordOtp ||
      user.resetPasswordOtp !== otp ||
      !user.resetPasswordOtpExpires ||
      user.resetPasswordOtpExpires < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' });
    }

    // Set new password (pre-save hook will hash it)
    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpires = null;
    await user.save();

    res.json({ message: 'Password reset successfully. You can now sign in with your new password.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle 2-Step Verification (2FA)
router.put('/toggle-2fa', authenticateToken, async (req, res) => {
  try {
    const { twoFactorEnabled } = req.body;

    if (typeof twoFactorEnabled !== 'boolean') {
      return res.status(400).json({ message: 'twoFactorEnabled must be a boolean' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.twoFactorEnabled = twoFactorEnabled;
    await user.save();

    res.json({
      message: `2-Step Verification ${twoFactorEnabled ? 'enabled' : 'disabled'} successfully`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

// Update Profile (Username)
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim().length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    const trimmedUsername = username.trim();

    // Check if username is taken by another user
    const existingUser = await User.findOne({ 
      username: trimmedUsername, 
      _id: { $ne: req.user.userId } 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = trimmedUsername;
    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change Password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Both old and new passwords are required' });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: PASSWORD_REQUIREMENTS_MSG });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Set new password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
