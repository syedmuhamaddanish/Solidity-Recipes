require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.11",
   defaultNetwork: "volta",
   networks: {
      hardhat: {},
      volta: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 210000000,
         gasPrice: 800000000000,
      },
      matic: {
         allowUnlimitedContractSize: true,
        url: "https://matic-mumbai.chainstacklabs.com/",
        accounts: [`0x${PRIVATE_KEY}`],
        gas: 2100000,
         gasPrice: 8000000000
      }
   },
}