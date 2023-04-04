// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable, MyToken {
    IERC20 public _token;
    uint256 private _amount;
    mapping(address => uint256) private _lastDripTime;

    uint256 private constant _dripInterval = 5 minutes;

    constructor(IERC20 token, uint256 amount) public {
        _token = token;
        _amount = amount * (10 ** _decimals);      
        Ownable.transferOwnership(msg.sender);
    }

    modifier canDrip(address recipient) {
        require(getLastDripTime(recipient) + _dripInterval <= block.timestamp, "Recipient has to wait for 5 minutes");
        _;
    }

    modifier tokenSet() {
        require(address(_token) != address(0), "Token address not set");
        _;
    }

    modifier amountSet() {
        require(_amount > 0, "Token address not set");
        _;
    }

    function setAmount(uint256 amount) public onlyOwner {
        _amount =  amount * (10 ** _decimals);
    }

    function drip(address recipient) public tokenSet amountSet canDrip(recipient) {
        _token.transfer(recipient, _amount);
        _lastDripTime[recipient] = block.timestamp;
    }

    function getLastDripTime(address recipient) public view returns (uint256) {
        return _lastDripTime[recipient];
    }

    function dripCheck(address recipient) public view returns(bool) {
        if (getLastDripTime(recipient) + _dripInterval <= block.timestamp) {
            return true;
        }
        else {
            return false;
        }
    }

    
}