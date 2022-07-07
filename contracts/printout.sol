// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// importing libraries
import "hardhat/console.sol";

// error generation
error printout__NotOwner();

/** @author Antonio Pucciarelli
 *  @notice Demo of simple funding
 *  @dev This implement price feed as our library
 */
contract printout {
    string public x = "_";

    constructor() {}

    /** @return x -> parameter set globaly
     */
    function printoutFunc() public view returns (string memory) {
        console.log("string = %s", x);
        return x;
    }

    function setupVariable(string memory _x) public returns (string memory){
        console.log("old string = %s", x);
        x = _x;
        console.log("new string = %s", x);
        return x;
    }

    function paySmartContract() public payable {
        console.log("The amount sent to this smart contract is: %d wei", msg.value);
    }

    function getBalance() public view returns(uint256){
        uint256 addressBalance = address(this).balance;
        return addressBalance;
    }

}
