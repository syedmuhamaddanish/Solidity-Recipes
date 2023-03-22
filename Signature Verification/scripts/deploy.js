
const hre = require("hardhat");

async function main() {

  const VerifySignature = await hre.ethers.getContractFactory("VerifySignature");
  const VerifySignature_ = await VerifySignature.deploy();

  await VerifySignature_.deployed();

  console.log(
    `Contract Address: ${VerifySignature_.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
