const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

/**
 * @title this function deploy the contract
 * @param getNamedAccounts sets up the deployment contract
 * @param deployments sets up the deployer function
 */
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  // contract deployment
  if (developmentChains.includes(network.name)) {
    log(
      "\nLocal network detected! => " +
        "\x1b[35m" +
        network.name +
        "\x1b[37m" +
        "\nDeploying mocks on " +
        network.name +
        "..."
    );

    // contract deployment
    const printoutContract = await deploy("printout", {
      from: deployer,
      log: true,
      args: [],
    });

    // printing stuff -> not relevant
    log(
      "\n\t" +
        String.fromCodePoint(0x2705) +
        " Contract deployed on " +
        network.name +
        " !"
    );

    log(
      "\t" +
        String.fromCodePoint(0x1f4bb) +
        " Deployer address: " +
        "\x1b[35m    " +
        deployer +
        "\x1b[37m"
    );
    
    log(
      "\t" +
        String.fromCodePoint(0x1f4e8) +
        " Contract deployed at: " +
        "\x1b[35m" +
        printoutContract.address +
        "\x1b[37m\n"
    );
    
    log(
      "\t" +
        String.fromCodePoint(0x2755) +
        " You are deploying to a local network, you'll need a local network running to interact"
    );
    
    log(
      "\t" +
        String.fromCodePoint(0x2755) +
        " Please run `npx hardhat console` to interact with the deployed smart contracts! \n"
    );
  }
};

module.exports.tags = ["all", "mocks"];
