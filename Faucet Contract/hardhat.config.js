
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL_VOLTA, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.11",
   defaultNetwork: "volta",
   networks: {
      hardhat: {},
      volta: {
         url: API_URL_VOLTA,
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