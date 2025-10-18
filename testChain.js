const Blockchain = require('./blockchain');
const Transaction = require('./transaction');
const { generateKeyPair, signMessage } = require('./keyUtils');

const chain = new Blockchain();

const sender = generateKeyPair();
const receiver = generateKeyPair();

const message = sender.address + receiver.address + 100;
const signature = signMessage(message, sender.privateKey);

const tx = new Transaction(
  sender.address,
  receiver.address,
  100,
  signature,
  sender.publicKey
);

chain.addTransaction(tx);
chain.minePendingTransactions();

console.log("Sender Balance:", chain.getBalance(sender.address));
console.log("Receiver Balance:", chain.getBalance(receiver.address));
