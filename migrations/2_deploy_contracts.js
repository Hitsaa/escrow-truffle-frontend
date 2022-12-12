const clientContract = artifacts.require('ClientContract');
const projectContract = artifacts.require('ProjectContract');
const developerContract = artifacts.require('DeveloperContract');
const clientDeveloperContract = artifacts.require('ClientDeveloperContract');
const escrowContract = artifacts.require('EscrowContract');
const erc20Contract = artifacts.require('ERC20Contract');

module.exports = function (deployer, network, accounts) {
  // deployer.deploy(escrowContract);
  deployer.deploy(clientDeveloperContract);
  deployer.link(clientDeveloperContract, escrowContract);
  deployer.deploy(clientContract);
  deployer.deploy(projectContract);
  deployer.deploy(developerContract);
}