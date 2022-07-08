const emojic = require("emojic");
const prompt = require("prompt-sync")();
const { getNamedAccounts, ethers } = require("hardhat");

/**
 * @notice this function runs a function of the printout solidity script on the blockchain -> make it sure the contract has been deployed on the blockchain
 * @dev this function sends ETH between 2 different accounts on the hardhat blockchain 
*/
async function main() {
  const funcName = "sendCoins()";
  const { deployer, user, user1, user2 } = await getNamedAccounts();
  const [deployerSigner, userSigner, user1Signer, user2Signer] =
    await ethers.getSigners();
  const userVec = [deployer, user, user1, user2];
  const userSignerVec = [deployerSigner, userSigner, user1Signer, user2Signer];

  console.log(
    "\nRunning " +
      "\x1b[31m" +
      funcName +
      "\x1b[37m \n" +
      "==============================================================="
  );

  var inputValue = prompt(
    "Type amount of coins you want to send to the Smart Contract (ETH): "
  );

  console.log("Type address name that will send the coin(s): ");
  for (let ii = 0; ii < userVec.length; ii++) {
    console.log(
      "\t" + emojic.computer + " User %d :\x1b[35m %s \x1b[37m",
      ii,
      userSignerVec[ii].address
    );
  }

  var sendingAddress = prompt("Selected address (number in the list): ");
  console.log(
    "\t" + emojic.computer + " User %d :\x1b[35m %s \x1b[37m",
    sendingAddress,
    userSignerVec[sendingAddress].address
  );

  console.log("\nType address name that will receive the coin(s): ");
  for (let ii = 0; ii < userVec.length; ii++) {
    console.log(
      "\t" + emojic.computer + " User %d :\x1b[35m %s \x1b[37m",
      ii,
      userVec[ii]
    );
  }

  var receivingAddress = prompt("Selected address (number in the list): ");
  console.log(
    "\t" + emojic.computer + " User %d :\x1b[35m %s \x1b[37m",
    receivingAddress,
    userVec[receivingAddress]
  );

  // setting up new variable
  console.log(
    "\nTransfering coin(s):\n\tfrom: " +
      emojic.computer +
      "\x1b[35m %s \x1b[37m \n\tto:   " +
      emojic.computer +
      "\x1b[35m %s \x1b[37m",
    userSignerVec[sendingAddress].address,
    userVec[receivingAddress]
  );

  await userSignerVec[sendingAddress].sendTransaction({
    to: userVec[receivingAddress],
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
