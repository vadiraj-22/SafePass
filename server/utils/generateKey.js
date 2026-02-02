import crypto from 'crypto';

/**
 * Generates a secure random encryption key
 * Run this script to generate a new ENCRYPTION_KEY for your .env file
 */
function generateEncryptionKey() {
    // Generate a 64-character (256-bit) random hex string
    const key = crypto.randomBytes(32).toString('hex');

    console.log('\n==============================================');
    console.log('Generated Encryption Key:');
    console.log('==============================================\n');
    console.log(key);
    console.log('\n==============================================');
    console.log('Add this to your .env file as:');
    console.log('==============================================\n');
    console.log(`ENCRYPTION_KEY=${key}`);
    console.log('\n⚠️  IMPORTANT: Keep this key secret and secure!');
    console.log('⚠️  If you lose this key, you cannot decrypt existing passwords!');
    console.log('⚠️  Never commit this key to version control!\n');
}

generateEncryptionKey();
