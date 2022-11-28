// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import './ERC20Contract.sol';

contract ClientDeveloperContract {
    enum CompletedMileStoneState { MILESTONE1_COMPLETED, MILESTONE2_COMPLETED, MILESTONE3_COMPLETED }
    enum SubmittedMileStoneState { INITIATED, MILESTONE1_SUBMITTED, MILESTONE2_SUBMITTED, MILESTONE3_SUBMITTED }
    CompletedMileStoneState public currCompletedState;
    SubmittedMileStoneState public currSubmittedState;

    address developer;
    address client;
    string[] public milestones;
    // mapping(uint => string) milestones;

    constructor() {
        
    }

    modifier onlyClient() {
        require(msg.sender == client, "Only Client can call this method");
        _;
    }

    modifier onlyDeveloper() {
        require(msg.sender == developer, "Only Developer can call this method");
        _;
    }

    function initiated() onlyDeveloper public {
        currSubmittedState = SubmittedMileStoneState.INITIATED;
    }

    function submitMileStone1() onlyDeveloper public {
        require(currSubmittedState == SubmittedMileStoneState.INITIATED);
        currSubmittedState = SubmittedMileStoneState.MILESTONE1_SUBMITTED;
    }

    function setDeveloper(address dev) public {
        developer = dev;
    }

    function setClient(address cli) public {
        client = cli;
    }

    function addMileStone(string memory milestone) onlyDeveloper public {
        milestones.push(milestone);
    }

    function getMileStone(uint256 id) public view returns(string memory) {
        return milestones[id];
    }

    function approveMilestone(uint id) onlyClient public {
        currSubmittedState = SubmittedMileStoneState(id);
    }
    // function submitMileStone2() onlyDeveloper public {
        
    // }

    // function submitMileStone3() onlyDeveloper public {
        
    // }

    // function completedMileStone1() onlyClient public {

    // }

    // function completedMileStone2() onlyClient public {
        
    // }

    // function completedMileStone3() onlyClient public {
        
    // }

}