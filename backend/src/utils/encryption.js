// utils/encryption.js

const crypto = require('crypto');

// Ensure the encryption key is a 64-character hexadecimal string (32 bytes)
// Store this securely, e.g., in environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // e.g., '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

// AES block size for CBC mode is 16 bytes
const IV_LENGTH = 16;

/**
 * Encrypts a given text using AES-256-CBC encryption.
 * @param {string} text - The plaintext to encrypt.
 * @returns {string} The encrypted data in the format 'iv:encryptedText', both in hexadecimal.
 */
function encrypt(text) {
    // Generate a random Initialization Vector (IV)
    const iv = crypto.randomBytes(IV_LENGTH);

    // Create a Cipher instance using the AES-256-CBC algorithm, the encryption key, and the IV
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY, 'hex'),
        iv
    );

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Combine the IV and encrypted text with a colon separator
    // This allows the IV to be used during decryption
    return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypts a given encrypted text using AES-256-CBC decryption.
 * @param {string} text - The encrypted data in the format 'iv:encryptedText'.
 * @returns {string} The decrypted plaintext.
 */
function decrypt(text) {
    // Split the input text to extract the IV and the encrypted data
    const [ivHex, encryptedData] = text.split(':');

    // Convert the IV from hexadecimal to a Buffer
    const iv = Buffer.from(ivHex, 'hex');

    // Create a Decipher instance using the AES-256-CBC algorithm, the encryption key, and the IV
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPTION_KEY, 'hex'),
        iv
    );

    // Decrypt the encrypted data
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = { encrypt, decrypt };