const emojic = require("emojic");
const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const funcName = "printoutData.js"
  const { deployer } = await getNamedAccounts();
  
  console.log(
    "\nRunning " + "\x1b[31m" + funcName + "\x1b[37m \n\n" +  
      emojic.computer +
      " Deployer address: " +
      "\x1b[35m" +
      deployer +
      "\x1b[37m \n"
  );

  const printoutContract = await ethers.getContract("printout", deployer);
  console.log("Printout 'x' string in contract -> check blockchain node");
  await printoutContract.printoutFunc();
  console.log("Printed out\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
