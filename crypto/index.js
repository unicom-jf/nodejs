let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}
var fs = require('fs');
const ALGORITHM = 'aes-256-cbc';
const CIPHER_KEY = "abcdefghijklmnopqrstuvwxyz012345";  // Same key used in Golang
const BLOCK_SIZE = 16;

const plainText = "1234567890";  // This plainText was encrypted to make the cipherText below by Golang
//const cipherText = "f17ba46472fa64e40ca496d1b4c91e8fac967926dfbdd7097b4c8f8ebd18f898";  // hexidecimal cipherText created by Golang
//const cipherText = "4c6fdec889ae9de4c119561fb557472d6d9b99b0782af63e490c8310d6ad6752"
var fileBody = fs.readFileSync("/Users/jf10/pwd2.dat")
var cipherText = Buffer.from(fileBody, 'hex')
const decrypted = decrypt(cipherText);

if (decrypted !== plainText) {
  console.log(`FAILED: expected ${plainText} but got "${decrypted}"`);
} else {
  console.log(`PASSED: ${plainText}`);
}

// Decrypts cipher text into plain text
function decrypt(cipherText) {
  const contents = Buffer.from(cipherText, 'hex');
  const iv = contents.slice(0, BLOCK_SIZE);
  const textBytes = contents.slice(BLOCK_SIZE);

  const decipher = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, iv);
  let decrypted = decipher.update(textBytes, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
