const clientContract = artifacts.require('ClientContract');
const clientDeveloperContract = artifacts.require('ClientDeveloperContract');
const escrowContract = artifacts.require('EscrowContract');
const erc20Contract = artifacts.require('ERC20Contract');

module.exports = function (deployer) {
  // deployer.deploy(escrowContract);
  deployer.deploy(clientDeveloperContract);
  deployer.link(clientDeveloperContract, escrowContract);
  deployer.deploy(clientContract);
}