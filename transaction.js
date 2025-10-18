class Transaction {
  constructor(from, to, amount, signature, fromPublicKey) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.signature = signature;
    this.fromPublicKey = fromPublicKey;
  }
}

module.exports = Transaction;
