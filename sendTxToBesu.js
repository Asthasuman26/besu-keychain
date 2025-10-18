// Import required Ethers v6 modules
const { JsonRpcProvider, Wallet, parseEther, parseUnits } = require("ethers");

// Replace with your actual private key (keep it secret!)
const PRIVATE_KEY = "0xEnter you private_key";

// Create a JSON-RPC provider connected to your local Besu node
const provider = new JsonRpcProvider("http://localhost:8545");

// Create a Wallet instance from the private key and connect it to the provider
const wallet = new Wallet(PRIVATE_KEY, provider);

// Define an async function to send the transaction
async function send() {
  const tx = {
    to: "0xenter your address", // Replace with the recipient address
    value: parseEther("0.01"), // Sending 0.01 ETH
    gasLimit: 21000n, // Standard gas limit for ETH transfer
    maxFeePerGas: parseUnits("2", "gwei"),
    maxPriorityFeePerGas: parseUnits("1", "gwei"),
  };

  try {
    // Send the transaction
    const txResponse = await wallet.sendTransaction(tx);
    console.log(" Transaction sent:", txResponse.hash);

    // Wait for the transaction to be mined
    const receipt = await txResponse.wait();
    console.log(" Transaction mined in block:", receipt.blockNumber);
  } catch (error) {
    console.error(" Error sending transaction:", error);
  }
}

// Call the send function
send();
