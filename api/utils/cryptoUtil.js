const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const secret = Buffer.from(process.env.DESCRIPTOR_SECRET);
const iv = Buffer.from(process.env.DESCRIPTOR_IV, "hex");

if (secret.length !== 32) {
    throw new Error("DESCRIPTOR_SECRET must be 32 bytes");
}
if (iv.length !== 16) {
    throw new Error("DESCRIPTOR_IV must be 16 bytes (32 hex characters)");
}

exports.encryptDescriptor = (descriptorArray) => {
    try {
        const cipher = crypto.createCipheriv(algorithm, secret, iv);
        let encrypted = cipher.update(JSON.stringify(descriptorArray));
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    } catch (err) {
        console.error("Encryption failed:", err);
        throw new Error("Failed to encrypt face descriptor");
    }
};

exports.decryptDescriptor = (encryptedString) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, secret, iv);
        let decrypted = decipher.update(Buffer.from(encryptedString, "hex"));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    } catch (err) {
        console.error("Decryption failed:", err);
        throw new Error("Failed to decrypt face descriptor");
    }
};