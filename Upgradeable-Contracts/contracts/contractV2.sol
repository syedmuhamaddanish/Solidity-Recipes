// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./contractV1.sol";

contract contractV2 is contractV1 {
    function increaseValue(uint256 _value) public {
        value += _value;
    } 
}