pragma solidity ^0.8.0;

contract Greeting {
    string private greeting;

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }
}
