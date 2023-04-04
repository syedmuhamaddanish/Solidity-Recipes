// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract MyToken is IERC20, Ownable, Initializable {
    address contractOwner;
    string private _name;
    string private _symbol;
    uint8 public _decimals;
    mapping(address => uint256) private _balances;
    mapping(address => mapping (address => uint256)) private _allowances;  //allowance[address][address] = amount
    uint256 private _totalSupply;

    function initialize (string memory name_, string memory symbol_, uint8 decimals_) public initializer {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _mint(address(this), 1000000 * (10 ** decimals_));
        transferOwnership(msg.sender);
    }

    function _mint(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "ERC20: cannot mint tokens to zero address");
        
        _totalSupply += amount;
        _balances[account] +=amount;
        emit Transfer(address(0), account, amount);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer (address recipient, uint256 amount) public override returns (bool) {
        _transfer(address(this), recipient, amount);
        return true;
    }

    function _transfer (address sender, address recipient, uint256 amount) internal {
        require (sender != address(0));
        require (recipient != address(0));

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        _totalSupply -= amount;

        emit Transfer(sender, recipient, amount);
    }

    function approve (address spender, uint256 amount) public returns (bool) {
       
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        
    }

    function allowance(address owner, address spender) public view returns (uint256) {
    
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
       
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
      
    }

}