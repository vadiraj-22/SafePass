import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Password from '../models/Password.js';
import { encrypt, isEncrypted } from '../utils/encryption.js';

// Load environment variables
dotenv.config();

/**
 * Migration script to encrypt all existing plain text passwords in the database
 * This should be run once after implementing encryption
 */
async function migratePasswords() {
    try {
        console.log('🔄 Starting password encryption migration...\n');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find all passwords
        const passwords = await Password.find({});
        console.log(`📊 Found ${passwords.length} password entries\n`);

        let encryptedCount = 0;
        let alreadyEncryptedCount = 0;
        let errorCount = 0;

        // Process each password
        for (const passwordDoc of passwords) {
            try {
                // Check if password is already encrypted
                if (isEncrypted(passwordDoc.password)) {
                    alreadyEncryptedCount++;
                    console.log(`⏭️  Skipping already encrypted password for ${passwordDoc.website}`);
                    continue;
                }

                // Store the plain text password
                const plainPassword = passwordDoc.password;

                // Encrypt it manually (bypass the pre-save hook)
                const encryptedPassword = encrypt(plainPassword);

                // Update directly in database to avoid triggering hooks multiple times
                await Password.updateOne(
                    { _id: passwordDoc._id },
                    { $set: { password: encryptedPassword, updatedAt: new Date() } }
                );

                encryptedCount++;
                console.log(`✅ Encrypted password for ${passwordDoc.website}`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Error encrypting password for ${passwordDoc.website}:`, error.message);
            }
        }

        // Summary
        console.log('\n==============================================');
        console.log('Migration Summary:');
        console.log('==============================================');
        console.log(`Total passwords: ${passwords.length}`);
        console.log(`✅ Newly encrypted: ${encryptedCount}`);
        console.log(`⏭️  Already encrypted: ${alreadyEncryptedCount}`);
        console.log(`❌ Errors: ${errorCount}`);
        console.log('==============================================\n');

        if (errorCount === 0) {
            console.log('🎉 Migration completed successfully!\n');
        } else {
            console.log('⚠️  Migration completed with some errors. Please review the logs.\n');
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('👋 Database connection closed');
        process.exit(0);
    }
}

// Run migration
migratePasswords();
