const {ethers} = require('ethers');

require('dotenv').config();

const API_URL = process.env.API_URL_VOLTA;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS_VOLTA;

const {abi} = require("./artifacts/contracts/MyToken.sol/MyToken.json");

const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const decimals = 18;
// Example usage of contract functions

async function initialize() {
    const initializeTx = await contract.initialize("MyToken", "MTK", decimals);
    await initializeTx.wait();
    console.log("Contract Initialized")

    const totalSupply = await contract.totalSupply();
    console.log("Total supply:", ethers.utils.formatUnits(totalSupply, decimals));

    const balanceOfcontract = await contract.balanceOf("0xC10E2395121D323C79d24a93CB110D06f4537bc8");
    console.log("Balance of 0xC10E2395121D323C79d24a93CB110D06f4537bc8:", ethers.utils.formatUnits(balanceOfcontract, decimals));
}

async function main() {
    const totalSupply = await contract.totalSupply();
    console.log("Total supply:", ethers.utils.formatUnits(totalSupply, decimals));

    const balanceOfcontract = await contract.balanceOf("0xC10E2395121D323C79d24a93CB110D06f4537bc8");
    console.log("Balance of 0xC10E2395121D323C79d24a93CB110D06f4537bc8:", ethers.utils.formatUnits(balanceOfcontract, decimals));

    const balanceof0x65 = await contract.balanceOf("0x2bbe50DDfE077837701213C44ABbe298fDE5f72d");
    console.log("Balance of 0x2bbe50DDfE077837701213C44ABbe298fDE5f72d:", ethers.utils.formatUnits(balanceof0x65, decimals));
}

main().catch((err) => console.error(err));