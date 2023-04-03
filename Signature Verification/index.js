exports.handler = async (event) => {

const {ethers} = require('ethers');

require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} = require("./artifacts/contracts/VerifySignature.sol/VerifySignature.json");

const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const message = "Hello";

let hash = ethers.utils.keccak256(ethers.utils.solidityPack(["string"], [message])); //variant of abi.encodePacked function in solidity

const signMessage = async() => {
    const sig = await signer.signMessage(ethers.utils.arrayify(hash));
    const ethHash = ethers.utils.keccak256(ethers.utils.solidityPack(["string", "bytes32"], ["\x19Ethereum Signed Message:\n32", hash]));
    console.log("Signer Address: ", signer.address);
    const {v, r, s} = ethers.utils.splitSignature(sig);
    let bool = await contractInstance.verify(signer.address, ethHash, r, s, v);
    console.log("Signer matched? " + bool);
}

signMessage();

}