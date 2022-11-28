// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import './ERC20Contract.sol';

contract DeveloperContract {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }
    
    mapping(address => uint256) balances;

    constructor() {
        
    }

   function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }

    function acceptProject() public {

    }

}