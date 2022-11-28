// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import './ERC20Contract.sol';
import './ClientDeveloperContract.sol';
import './EscrowContract.sol';

interface ClientContractInterface {
    function createProject() external view returns (address);
}

contract ClientContract is ClientContractInterface {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }
    // ClientDeveloperContract cc;
    mapping(address => uint256) balances;
    ERC20Contract erctoken = new ERC20Contract();

    constructor() {
        
    }

   function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }

    function setTokens(uint256 tokens) public {
        balances[msg.sender] += tokens;
    }

    function addToWallet(uint256 tokens) public {
        erctoken.transfer(address(this), tokens);
        balances[address(this)] = tokens;
    }

    function createProject() public view override returns (address) {
        // cc = new ClientDeveloperContract();
        // cc.setClient(address(this));
        return address(this);
    }

    // function approveMilestone(uint mileStoneId) public {
    //     // cc.approveMilestone(mileStoneId);
    // }

}