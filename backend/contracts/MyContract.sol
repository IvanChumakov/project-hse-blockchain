// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyContract {
    string private message;
    address public owner;

    mapping(address => bool) public userAccess;
    address[] public userList;
    string[] public nameList;

    uint256 public totalSupply = 1000000;
    mapping(address => uint256) balances;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        owner = msg.sender;
        message = "Initial message";
        
        userList.push(owner);
        nameList.push("Admin");
        userAccess[owner] = true;
    }

    function _toggelAccess(address _userAddress, bool _bool) private {
        userAccess[_userAddress] =_bool;
    }

    // Function to grant access
    function grantAccess(address _userAddress, string memory _name) public {
        require(userAccess[_userAddress] == false, 'Already has access');

        _toggelAccess(_userAddress, true);
        userList.push(msg.sender);
        nameList.push(_name);
    }

    function getUsers() public view returns (address[] memory) {
        return userList;
    }

    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}