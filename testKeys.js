const { generateKeyPair, signMessage, verifySignature } = require('./keyUtils');

// Generate a new key pair
const { privateKey, publicKey, address } = generateKeyPair();

console.log("Generated Address:", address);
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);

// Message to be signed
const message = "Hello Blockchain!";

// Sign the message
const signature = signMessage(message, privateKey);
console.log("Signature:", signature);

// Verify the signature
const isValid = verifySignature(message, signature, publicKey);
console.log("Signature Valid:", isValid);
