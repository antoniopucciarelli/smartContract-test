const emojic = require("emojic");
const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  
  console.log(
    "\t" +
      emojic.computer +
      " Deployer address: " +
      "\x1b[35m    " +
      deployer +
      "\x1b[37m"
  );

  const printoutContract = await ethers.getContract("printout", deployer);
  console.log("Printout 'x' string in contract...");
  const transactionResponse = await printoutContract.printoutFunc();
  //await transactionResponse.wait(1);
  console.log("Printed out");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
