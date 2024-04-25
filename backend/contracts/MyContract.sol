// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyContract {
    string private message;
    uint256 globalId = 0;
    address public owner;

    mapping(address => bool) public userAccess;
    // mapping(address => string) public userId;
    // address[] public userList;

    // The fixed amount of tokens, stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;
    // A mapping is a key/value map. Here we store each account's balance.
    mapping(address => uint256) balances;
    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
        // userList.push(owner);
        message = "Initial message";
    }

    function _toggelAccess(address _userAddress, bool _bool) private {
        userAccess[_userAddress] =_bool;
    }

    // Function to grant access
    function grantAccess(address _userAddress) public {
        // check current status
        // require(msg.sender == owner, "You're not admin");
        require(userAccess[_userAddress] == false, 'Already has access');
        _toggelAccess(_userAddress, true);
    }

    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }

    function transfer(address to, uint256 amount) external {
        // Check if the transaction sender has enough tokens.
        // If require`'s first argument evaluates to `false then the
        // transaction will revert.
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