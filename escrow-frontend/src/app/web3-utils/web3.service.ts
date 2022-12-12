import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare let require: any;
const Web3 = require("web3");
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: typeof Web3;
  private accounts: string[] = [];
  private refreshedAccounts: boolean = false;
  public balance!: string[];
  public ready = false;

  public accountsObservable = new Subject<string[]>();
  private newProjectContract = new Subject<any>();
  public newProjectContract$ = this.newProjectContract.asObservable();
  constructor() {
    window.addEventListener("load", () => {
      // this.bootstrapWeb3();
      this.setLocalhostProvider();
      this.getAllAccountsList();
    });
  }


  public async bootstrapWeb3() {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
      console.log('in ethereum')
      try {
        console.log(window.ethereum)
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        this.web3 = new Web3(window.ethereum);
      } catch (error) {
        console.error(error);
      }
    } else if (typeof window.web3 !== "undefined") {
      console.log('in typeof')
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      // Use Mist/MetaMask's provider
      // this.web3 = new Web3(window.web3.currentProvider);

      window.ethereum.enable().then(() => {
        this.web3 = new Web3(window.ethereum);
      });
      console.log(this.web3);
    } else {
      this.setLocalhostProvider();
    }

    // setInterval(() => {
    //   if(!this.refreshedAccounts) {
    //     this.refreshAccounts();
    //   }
    //   if(this.accounts.length > 0) {
    //     this.refreshedAccounts = true;
    //   }

    // }, 1000);
    this.getAllAccountsList();
  }

  public async setLocalhostProvider() {
    console.log("No web3? You should consider trying MetaMask!");

    // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );

  }

  public async getAllAccountsList() {
    setInterval(() => {
      if (!this.refreshedAccounts) {
        this.refreshAccounts();
      }
      if (this.accounts.length > 0) {
        this.refreshedAccounts = true;
      }

    }, 1000);
  }

  public async artifactsToContract(artifacts: any): Promise<any> {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contract = require("@truffle/contract");
    const contractAbstraction = contract(artifacts);
    console.log(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;
  }

  private refreshAccounts() {
    this.web3.eth.getAccounts(async (err: any, accs: any) => {
      console.log("Refreshing accounts");
      if (err != null) {
        console.warn("There was an error fetching your accounts.");
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }

      console.log(this.accounts);

      if (
        !this.accounts ||
        this.accounts.length !== accs.length ||
        this.accounts[0] !== accs[0]
      ) {
        console.log("Observed new accounts");

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }

  async deployAlreadyDeployedContract(contractArtifacts: any, model: any, deployedContractArtifact?: any) {
    // 1st way is by using contractArtifacts first we have to extract the contract using abi
    // let deployedContract = new this.web3.eth.Contract(contractArtifacts["abi"]);
    // 2nd way is to use our deployedContractArtifact which we get from artifactsToContract function (define above), when we call it from client component file.
    // we get contract directly because it is already extracted from artifactsToContract function.
    let newContract: any;
    let deployedContract = deployedContractArtifact.contract;
    console.log(deployedContract);
    let parameter = {
      from: model.account,
      gas: this.web3.utils.toHex(1200000),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('30', 'gwei'))
    }
    let bytecode = contractArtifacts["bytecode"];
    let payload = {
      data: bytecode,
    }
    await deployedContract.deploy(payload).send(parameter, (err: any, transactionHash: any) => {
      console.log('Transaction Hash :', transactionHash);
    }).on('confirmation', () => { }).then((newContractInstance: any) => {
      newContract = newContractInstance;
    });
    return newContract;
  }

  async deployFreshContract(contractArtifacts: any, model: any) {
    let newContract: any;
    let deployedContract = new this.web3.eth.Contract(contractArtifacts["abi"]);
    console.log(deployedContract);
    let parameter = {
      from: model.account,
      gas: this.web3.utils.toHex(1200000),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('30', 'gwei'))
    }
    let bytecode = contractArtifacts["bytecode"];
    let payload = {
      data: bytecode,
    }
    await deployedContract.deploy(payload).send(parameter, (err: any, transactionHash: any) => {
      console.log('Transaction Hash :', transactionHash);
    }).on('confirmation', () => { }).then((newContractInstance: any) => {
      newContract = newContractInstance;
    });
    return newContract;
  }
}
