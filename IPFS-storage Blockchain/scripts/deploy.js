async function main() {
  const IPFShashStorage = await ethers.getContractFactory("IPFShashStorage");

  // Start deployment, returning a promise that resolves to a contract object
  const IPFShashStorage_ = await IPFShashStorage.deploy();
  console.log("Contract address:", IPFShashStorage_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });