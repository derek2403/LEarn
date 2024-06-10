// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthClaim {
    address public owner;

    event EthClaimed(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function claimEth(uint256 amount) external {
        require(address(this).balance >= amount, "Insufficient contract balance");

        payable(msg.sender).transfer(amount);

        emit EthClaimed(msg.sender, amount);
    }

    function depositEth() external payable onlyOwner {
        // Function to deposit ETH into the contract
    }

    function withdrawEth(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");
        payable(owner).transfer(amount);
    }

    // Fallback function to accept ETH transfers
    receive() external payable {}
}
