//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract EscrowContract {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }
    
    State public currState;
    mapping(address => mapping(address => uint256)) public escrowBalance;
    mapping(address => mapping(address => uint256)) public escrowExpiration;
    
    address public developer;
    address payable public client;


    modifier onlyDeveloper() {
        require(msg.sender == developer, "Only developer can call this method");
        _;
    }


    constructor(address _developer, address payable _client) {
        developer = _developer;
        client = _client;
    }

    function deposit() onlyDeveloper external payable {
        require(currState == State.AWAITING_PAYMENT, "Already paid");
        currState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() onlyDeveloper external {
        require(currState == State.AWAITING_DELIVERY, "Cannot confirm delivery");
        client.transfer(address(this).balance);
        currState = State.COMPLETE;
    }

    
}