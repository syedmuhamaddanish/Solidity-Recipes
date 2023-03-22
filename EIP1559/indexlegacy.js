const {ethers} = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const Private_key = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(Private_key, provider);
const {abi} = require("./artifacts/contracts/Greeting.sol/Greeting.json");
const contractInstance= new ethers.Contract(contractAddress, abi, signer);

async function tx() {
    const estimatedGasLimit = await contractInstance.estimateGas.setGreeting("Hello");
    const TxUsigned = await contractInstance.populateTransaction.setGreeting("Hello");

    TxUsigned.chainId = 73799; 
    TxUsigned.gasLimit= estimatedGasLimit;

    let nonce = await provider.getTransactionCount(signer.address);

    TxUsigned.nonce = nonce;
    
    TxUsigned.gasPrice = await provider.getGasPrice();

    const TxSigned = await signer.signTransaction(TxUsigned);

    const submittedTx = await provider.sendTransaction(TxSigned);

    const receipt = await submittedTx.wait();

    if (receipt.status === 0) {
        console.log("The transaction is failed")
    } else {
        console.log(`The tranasction is approved with Tx hash : ${submittedTx.hash}`)
    }
}

tx();