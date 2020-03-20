const crypto = require('crypto');

module.exports = {
  encrypt(key, data) {
    let sha256 = crypto.createHash('sha256');
    sha256.update(key);

    let iv = crypto.randomBytes(16),
      plainText = Buffer.from(data),
      cipher = crypto.createCipheriv('aes-256-ctr', sha256.digest(), iv),
      cipherText = cipher.update(plainText);
    cipherText = Buffer.concat([iv, cipherText, cipher.final()]);

    return cipherText.toString('base64');
  },
  decrypt(key, data) {
    let sha256 = crypto.createHash('sha256');
    sha256.update(key);

    let input = Buffer.from(data, 'base64'),
      iv = input.slice(0, 16),
      cipherText = input.slice(16),
      decipher = crypto.createDecipheriv('aes-256-ctr', sha256.digest(), iv),
      plainText = decipher.update(cipherText);
    plainText += decipher.final();

    return plainText;
  }
};
