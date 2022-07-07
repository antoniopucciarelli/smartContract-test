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
  const printoutContract = await ethers.getContract("printout", deployer);

  // getting smart contract balance 
  const smartContractAddress = printoutContract.address
  const smartContractBalance = await ethers.provider.getBalance(smartContractAddress);
  console.log("🪙" + "  \x1b[35m" + smartContractAddress + "\x1b[37m Smart contract balance: " + smartContractBalance/1e+18 + " ETH");

  // setting up new variable
  const addressBalance = await ethers.provider.getBalance(deployer);
  console.log("🪙" + "  \x1b[35m" + deployer + "\x1b[37m Account balance:        " + addressBalance/1e+18 + " ETH\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });