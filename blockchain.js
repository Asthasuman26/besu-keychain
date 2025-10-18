const Block = require('./block');
const { verifySignature } = require('./keyUtils');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.balances = {};
  }

  createGenesisBlock() {
    return new Block("0", []);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    const { from, to, amount, signature, fromPublicKey } = transaction;
    const isValid = verifySignature(from + to + amount, signature, fromPublicKey);
    if (!isValid) throw new Error("Invalid transaction signature");
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions() {
    const block = new Block(this.getLatestBlock().hash, this.pendingTransactions);
    block.mine(this.difficulty);
    this.chain.push(block);

    // Update balances
    for (let tx of this.pendingTransactions) {
      this.balances[tx.from] = (this.balances[tx.from] || 0) - tx.amount;
      this.balances[tx.to] = (this.balances[tx.to] || 0) + tx.amount;
    }

    this.pendingTransactions = [];
  }

  getBalance(address) {
    return this.balances[address] || 0;
  }
}

module.exports = Blockchain;
