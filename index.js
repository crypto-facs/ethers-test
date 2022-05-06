const { ethers } = require("ethers");

const TESTNET_RPC = "";
const LOCAL_RPC = "http://localhost:8545";
const AMOUNT_OF_TRANSACTIONS = 5;

const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0xED1097Ebe9826f62BF019d24c5989bD594FAcc24";

let PRIVATE_KEY = "ENTER_PRIVATE_KEY_HERE";

const provider = new ethers.providers.JsonRpcProvider(TESTNET_RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

const runScript = async () => {
  for (let i = 0; i <= AMOUNT_OF_TRANSACTIONS; i++) {
    try {
      console.log(`\n***** Starting Transaction ${i} *****\n`);
      const transactionCount = await provider.getTransactionCount(
        "0xf4050cbd159Fac90fFA33e9b118093504c579082"
      );
      console.log("Transaction Count: ", transactionCount);
      let contractWithSigner = contract.connect(wallet);
      const tx = await contractWithSigner.store(5);
      console.log("Transaction Response: ", tx);
      console.log("\nWaiting for transaction...\n");
      await tx.wait();
      const receipt = await provider.getTransactionReceipt(tx.hash);
      console.log("Transaction Receipt: ", receipt);
    } catch (err) {
      console.log(`Error on tx ${i}: `, err || err.message);
    }
  }
};

runScript();
