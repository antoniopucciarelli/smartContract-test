const emojic = require("emojic");
const { getNamedAccounts, ethers } = require("hardhat");

/**
 * @notice this function runs a function of the printout solidity script on the blockchain -> make it sure the contract has been deployed on the blockchain
 */
async function main() {
  const funcName = "printData()";
  const { deployer } = await getNamedAccounts();

  console.log(
    "\nRunning " +
      "\x1b[31m" +
      funcName +
      "\x1b[37m \n\n" +
      emojic.computer +
      " Deployer address: " +
      "\x1b[35m" +
      deployer +
      "\x1b[37m \n" + 
      "==============================================================="
  );

  // waiting for the contract to be loaded
  const printoutContract = await ethers.getContract("printout", deployer);

  // printing data
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
