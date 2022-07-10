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
    string public xOwner = "_"; // this variable can only be changed by the owner of the contract 
    string public x = "_";  // this variable can be changed by anyone 
    address private immutable owner; 
    
    address[] public addressList;
    mapping(address => string) addressFundedList; 

    constructor() {
        owner = msg.sender;
    }

    /** @dev this function allows to set defined contraints on other functions 
     */
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert printout__NotOwner();
        }
        _;
    }

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
        addressList.push(msg.sender);
        addressFundedList[msg.sender] = x; 
        return x;
    }

    function printList() public view {
        console.log("List of interactions");
        for(uint256 ii = 0; ii < addressList.length; ii = ii + 1){
            console.log("Interaction %d", ii);
            console.log("\taddress: \x1b[35m%s\x1b[37m", addressList[ii]);
            console.log("\tinput  : %s", addressFundedList[addressList[ii]]);
        }
    }

    function setupOwnedVariable(string memory _x) public onlyOwner returns (string memory){
        console.log("old owner string = %s", xOwner);
        xOwner = _x;
        console.log("new owner string = %s", xOwner);
        return xOwner;
    }

    function paySmartContract() public payable {
        console.log("The amount sent to this smart contract is: %d wei", msg.value);
    }

    function withdrawContract() public payable onlyOwner {
        console.log("Withdrawing funds");
        for(uint256 ii = 0; ii < addressList.length; ii = ii + 1){
            // setting up address balance to 0
            addressFundedList[addressList[ii]] = "0";
        }

        addressList = new address[](0);
    
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function getBalance() public view returns(uint256){
        uint256 addressBalance = address(this).balance;
        return addressBalance;
    }

}
