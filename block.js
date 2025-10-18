const keccak256 = require('keccak256');

class Block {
  constructor(previousHash, transactions = []) {
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.computeHash();
  }

  computeHash() {
    return keccak256(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString('hex');
  }

  mine(difficulty) {
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

module.exports = Block;
