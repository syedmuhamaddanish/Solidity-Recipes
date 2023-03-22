async function main() {
  const Greeting = await ethers.getContractFactory("Greeting");

  // Start deployment, returning a promise that resolves to a contract object
  const Greeting_ = await Greeting.deploy();
  console.log("Contract address:", Greeting_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });