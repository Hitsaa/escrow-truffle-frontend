import { Component, OnInit } from '@angular/core';

import { Web3Service } from 'src/app/web3-utils/web3.service';

declare let require: any;
const hitsatoken_artifacts = require("../../../../../build/contracts/ERC20Contract.json");

@Component({
  selector: 'app-hitsa-token',
  templateUrl: './hitsa-token.component.html',
  styleUrls: ['./hitsa-token.component.scss']
})
export class HitsaTokenComponent implements OnInit {

  accounts!: string[];
  HitsaToken: any;

  model = {
    sender: "",
    amount: 5,
    receiver: "",
    spender: "",
    accountBalance: "",
    balance: 0,
    account: ""
  };

  status = "";

  constructor(
    private web3Service: Web3Service,
  ) {
  }

  ngOnInit(): void {
    this.watchAccount();
    this.web3Service
      .artifactsToContract(hitsatoken_artifacts)
      .then(HitsaTokenAbstraction => {
        this.HitsaToken = HitsaTokenAbstraction;
        this.HitsaToken.deployed().then((deployed: any) => {
          console.log(deployed);
          deployed.Transfer({}, (err: any, ev: any) => {
            console.log("Transfer event came in, refreshing balance");
            this.refreshBalance();
          });
        });
      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
      this.refreshAccountBalance();
    });
  }

  setStatus(status: any) {
    // this.matSnackBar.open(status, null, { duration: 3000 });
  }

  async sendToken() {
    if (!this.HitsaToken) {
      this.setStatus("HitsaToken is not loaded, unable to send transaction");
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log("Sending coins" + amount + " to " + receiver);

    this.setStatus("Initiating transaction... (please wait)");
    try {
      const deployedHitsaToken = await this.HitsaToken.deployed();
      const transaction = await deployedHitsaToken.transfer.sendTransaction(
        receiver,
        
        amount,
        { from: this.model.account }
      );

      if (!transaction) {
        this.setStatus("Transaction failed!");
      } else {
        this.setStatus("Transaction complete!");
      }
    } catch (e) {
      console.log(e);
      this.setStatus("Error sending tokens; see log.");
    }
  }

  async approveSpender() {
    if (!this.HitsaToken) {
      this.setStatus("HitsaToken is not loaded, unable to approve");
      return;
    }

    const amount = this.model.amount;
    const spender = this.model.spender;

    if(amount <= 0) {
      alert("Please enter amount before approving");
      return;
    }

    if(!spender) {
      alert("Please enter spender before approving");
      return;
    }

    console.log("Approving " + amount + " tokens to " + spender);

    this.setStatus("Initiating transaction... (please wait)");
    try {
      const deployedHitsaToken = await this.HitsaToken.deployed();
      console.log(deployedHitsaToken.approve);
      const approval = await deployedHitsaToken.approve.sendTransaction(
        spender,
        amount,
        { from: this.model.account }
      );

      if (!approval) {
        this.setStatus("Approval failed!");
      } else {
        this.setStatus("Approval complete!");
      }
    } catch (e) {
      console.log(e);
      this.setStatus("Error approving token; see log.");
    }
  }

  async transferFrom() {
    if (!this.HitsaToken) {
      this.setStatus("HitsaToken is not loaded, unable to approve");
      return;
    }

    const sender = this.model.sender
    const amount = this.model.amount;
    const receiver = this.model.receiver;

    if(amount <= 0) {
      alert("Please enter amount before transaction");
      return;
    }

    if(!sender) {
      alert("Please enter sender before transaction");
      return;
    }

    if(!receiver) {
      alert("Please enter receiver befor transaction")
    }

    console.log(sender + " is Sending " + amount + " tokens to " + receiver);

    this.setStatus("Initiating transaction... (please wait)");
    try {
      const deployedHitsaToken = await this.HitsaToken.deployed();
      console.log(deployedHitsaToken.approve);
      const transaction = await deployedHitsaToken.transferFrom.sendTransaction(
        sender,
        receiver,
        amount,
        { from: this.model.spender }
      );

      if (!transaction) {
        this.setStatus("transaction failed!");
      } else {
        this.setStatus("transaction complete!");
      }
    } catch (e) {
      console.log(e);
      this.setStatus("Error in transfering token; see log.");
    }
  }



  async refreshBalance() {
    console.log("Refreshing balance");

    try {
      const deployedHitsaToken = await this.HitsaToken.deployed();
      console.log(deployedHitsaToken);
      console.log("Account", this.model.account);
      const hitsaTokenBalance = await deployedHitsaToken.balanceOf.call(
        this.model.account
      );
      console.log("Found balance: " + hitsaTokenBalance);
      this.model.balance = hitsaTokenBalance;
    } catch (e) {
      console.log(e);
      this.setStatus("Error getting balance; see log.");
    }
  }

  async refreshAccountBalance() {
    this.model.accountBalance = this.web3Service.web3.utils.fromWei(
      await this.web3Service.web3.eth.getBalance(this.accounts)
    );
    
  }

  setAmount(e: any) {
    console.log("Setting amount: " + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e: any) {
    console.log("Setting receiver: " + e.target.value);
    this.model.receiver = e.target.value;
  }

  setSpender(e: any) {
    console.log("Setting spender", + e.target.value);
    this.model.spender = e.target.value;
  }

  setSender(e: any) {
    console.log("Setting Sender", + e.target.value);
    this.model.sender = e.target.value;
  }
}
