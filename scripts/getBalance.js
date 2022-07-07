const emojic = require("emojic");
const prompt = require("prompt-sync")();
const { getNamedAccounts, ethers } = require("hardhat");

/**
 * @notice this function runs a function of the printout solidity script on the blockchain -> make it sure the contract has been deployed on the blockchain
 */
async function main() {
  const funcName = "paySmartContract()";
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
  await ethers.getContract("printout", deployer);

  // setting up new variable
  const addressBalance = await ethers.provider.getBalance(deployer);
  console.log("🪙" +  "  Account balance: " + addressBalance/1e+18 + " ETH\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });