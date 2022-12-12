// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import "hardhat/console.sol";

interface ProjectContractInterface {
    function getProjectName() external view returns (string memory);
    function setProjectName(string memory) external;
    function setClient(address) external;
}

contract ProjectContract is ProjectContractInterface {

    address clientAddress;
    constructor() {}

    string projectName;

    function getProjectName() public view returns (string memory) {
        return projectName;
    }

    function setProjectName(string memory _name) public {
        console.log("Changing greeting from '%s' to '%s'", projectName, _name);
        projectName = _name;
    }

    function setClient(address _clientAddress) public {
        clientAddress = _clientAddress;
    }
}