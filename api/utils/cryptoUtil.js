const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secret = Buffer.from(process.env.DESCRIPTOR_SECRET);
const iv = Buffer.from(process.env.DESCRIPTOR_IV, "hex");

exports.encryptDescriptor = (descriptorArray) => {
    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    let encrypted = cipher.update(JSON.stringify(descriptorArray));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
};

exports.decryptDescriptor = (encryptedString) => {
    const decipher = crypto.createDecipheriv(algorithm, secret, iv);
    let decrypted = decipher.update(Buffer.from(encryptedString, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
};