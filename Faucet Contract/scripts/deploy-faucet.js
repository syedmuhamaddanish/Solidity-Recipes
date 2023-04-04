const hre = require("hardhat");

async function main() {

  const Lock = await hre.ethers.getContractFactory("Faucet");
  const lock = await Lock.deploy("0xC10E2395121D323C79d24a93CB110D06f4537bc8", 2);

  await lock.deployed();

  console.log(
    `Contract Address: ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
