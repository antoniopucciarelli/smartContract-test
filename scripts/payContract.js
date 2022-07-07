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
  
  var inputValue = prompt("Type amount of coins you want to send to the Smart Contract: ");

  // setting up new variable
  console.log("Transfering coin(s)...");
  await printoutContract.paySmartContract({
    value: ethers.utils.parseEther(inputValue),
    });
  console.log("Coin(s) sent\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
