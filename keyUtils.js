const EC = require('elliptic').ec;
const keccak256 = require('keccak256');

const ec = new EC('secp256k1');

/**
 * Generates a new secp256k1 keypair and Ethereum-style address.
 */
function generateKeyPair() {
  const key = ec.genKeyPair();

  const privateKey = key.getPrivate('hex');
  const publicKey = key.getPublic(false, 'hex').slice(2); // uncompressed, remove "04" prefix
  const address = '0x' + keccak256(Buffer.from(publicKey, 'hex')).slice(-20).toString('hex');

  return { privateKey, publicKey, address };
}

/**
 * Signs a message (as a string or buffer) with a private key.
 * @param {string|Buffer} message - The message to sign
 * @param {string} privateKey - Hex private key
 */
function signMessage(message, privateKey) {
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const msgHash = keccak256(message); // returns Buffer
  const signature = key.sign(msgHash);

  return {
    r: signature.r.toString('hex'),
    s: signature.s.toString('hex'),
    v: signature.recoveryParam // needed for recovery
  };
}

/**
 * Verifies a signature against a message and a public key.
 * @param {string|Buffer} message - The original message
 * @param {object} signature - { r, s, v }
 * @param {string} publicKey - Hex public key (uncompressed, without "04")
 */
function verifySignature(message, signature, publicKey) {
  const key = ec.keyFromPublic('04' + publicKey, 'hex'); // add "04" prefix back
  const msgHash = keccak256(message);
  return key.verify(msgHash, signature);
}

module.exports = {
  generateKeyPair,
  signMessage,
  verifySignature
};
