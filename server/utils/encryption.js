import crypto from 'crypto';

// Algorithm for encryption
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // For AES, this is always 16
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000; // Number of iterations for PBKDF2

/**
 * Derives a key from the encryption secret using PBKDF2
 * @param {string} secret - The encryption secret from environment
 * @param {Buffer} salt - Salt for key derivation
 * @returns {Buffer} - Derived key
 */
function deriveKey(secret, salt) {
    return crypto.pbkdf2Sync(secret, salt, ITERATIONS, KEY_LENGTH, 'sha256');
}

/**
 * Encrypts a password using AES-256-GCM
 * @param {string} text - Plain text password to encrypt
 * @returns {string} - Encrypted password in format: salt:iv:encrypted:authTag (all hex encoded)
 */
export function encrypt(text) {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY is not set in environment variables');
    }

    // Generate random salt and IV
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);

    // Derive key from the encryption secret
    const key = deriveKey(process.env.ENCRYPTION_KEY, salt);

    // Create cipher
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get authentication tag
    const authTag = cipher.getAuthTag();

    // Return format: salt:iv:encrypted:authTag (all in hex)
    return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
}

/**
 * Decrypts an encrypted password
 * @param {string} encryptedText - Encrypted text in format: salt:iv:encrypted:authTag
 * @returns {string} - Decrypted plain text password
 */
export function decrypt(encryptedText) {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY is not set in environment variables');
    }

    try {
        // Split the encrypted text into its components
        const parts = encryptedText.split(':');

        if (parts.length !== 4) {
            throw new Error('Invalid encrypted text format');
        }

        const salt = Buffer.from(parts[0], 'hex');
        const iv = Buffer.from(parts[1], 'hex');
        const encrypted = parts[2];
        const authTag = Buffer.from(parts[3], 'hex');

        // Derive the same key using the salt
        const key = deriveKey(process.env.ENCRYPTION_KEY, salt);

        // Create decipher
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        // Decrypt the text
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
}

/**
 * Checks if a string is encrypted (has the expected format)
 * @param {string} text - Text to check
 * @returns {boolean} - True if text appears to be encrypted
 */
export function isEncrypted(text) {
    if (!text || typeof text !== 'string') {
        return false;
    }

    const parts = text.split(':');
    return parts.length === 4 &&
        parts.every(part => /^[0-9a-f]+$/i.test(part));
}
