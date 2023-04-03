const {ethers} = require('ethers');

require('dotenv').config();

const API_URL = process.env.API_URL_VOLTA;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS_VOLTA;

const {abi} = require("./artifacts/contracts/MyToken.sol/MyToken.json");

const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

async function initialize() {
    const initializeTx = await contract.initialize("MyToken", "MT", 18);
    await initializeTx.wait();
    console.log("Contract Initialized");

    

}

async function main() {
    const name = await contract.name();
    console.log("Name:", name);
  
    const symbol = await contract.symbol();
    console.log("Symbol:", symbol);
  
    const decimals = await contract.decimals();
    console.log("Decimals:", decimals);
  
    const totalSupply = await contract.totalSupply();
    console.log("Total supply:", ethers.utils.formatUnits(totalSupply, decimals));
  
    
  const amount = ethers.utils.parseUnits("1000", decimals);
  const privatekey = "842fe6181355618e73667a4ad9d3eac50f268ba8734aea75833e7f7e266b3cf3";
  const newSigner = new ethers.Wallet(privatekey, provider);
  const newcontract = new ethers.Contract(CONTRACT_ADDRESS, abi, newSigner);
  const owner = await contract.owner();
  const approveTx = await newcontract.approve(owner, amount);
  await approveTx.wait();
  console.log("Onwer can now spend on the behalf of new Signer");

  const spendAmount = await newcontract.allowance("0x01aE8aDad9726F9538A0Ce49981198631951Fb38", owner)
  console.log("Owner can spend tokens on behalf of newSigner: " + ethers.utils.formatUnits(spendAmount, decimals));

  const sender = "0x01aE8aDad9726F9538A0Ce49981198631951Fb38";
  const recipient2 = "0x65416FDd2C5e40074B25AA2B9C1176269ee8e4F6";
  const amount2 = ethers.utils.parseUnits("900", decimals);
  const transferFromTx = await contract.transferFrom(sender, recipient2, amount2);
  await transferFromTx.wait();
  console.log("900 Tokens transferred on the behalf of 0x01aE8aDad9726F9538A0Ce49981198631951Fb38");

  const balanceOf0x01 = await contract.balanceOf("0x01aE8aDad9726F9538A0Ce49981198631951Fb38");
  console.log("Balance:", ethers.utils.formatUnits(balanceOf0x01, decimals));

  const balanceOf0x65 = await contract.balanceOf("0x65416FDd2C5e40074B25AA2B9C1176269ee8e4F6");
  console.log("Balance:", ethers.utils.formatUnits(balanceOf0x65, decimals));
}

main().catch((err) => console.error(err));