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
    string public x = "ok!";

    constructor() {}

    /** @return x -> parameter set globaly
     */
    function printoutFunc() public view returns (string memory) {
        console.log("string = %s", x);
        return x;
    }
}
