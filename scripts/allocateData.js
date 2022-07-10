const emojic = require("emojic");
const prompt = require("prompt-sync")();
const { getNamedAccounts, ethers } = require("hardhat");

/** 
 * @notice this function runs a function of the printout solidity script on the blockchain -> make it sure the contract has been deployed on the blockchain
 */
async function main() {
  const funcName = "allocateData()";
  const { deployer, user, user1, user2 } = await getNamedAccounts();
  const userVec = [deployer, user, user1, user2];

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

  console.log("Type address name that will interact with the contract: ");
  for (let ii = 0; ii < userVec.length; ii++) {
    console.log(
      "\t" + emojic.computer + " User %d :\x1b[35m %s \x1b[37m",
      ii,
      userVec[ii]
    );
  }

  var interactingAddress = prompt("Selected address (number in the list): ");
  console.log(
    "\t" + emojic.computer + " User %d :\x1b[35m %s \x1b[37m",
    interactingAddress,
    userVec[interactingAddress]
  );

  // waiting for the contract to be loaded
  const printoutContract = await ethers.getContract("printout", userVec[interactingAddress]);

  
  var inputData = prompt("Type the new value you want to assign to 'x' variable in the contract: ");

  // setting up new variable
  console.log("Setting up new variable");
  await printoutContract.setupVariable(inputData);
  console.log("Variable set up\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
