const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV1 = await ethers.getContractFactory("contractV1");
  const proxy = await upgrades.deployProxy(BoxV1, [23]);
  await proxy.deployed();

  console.log(proxy.address);
}

main();