import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ClientInterface, ProjectInterface } from 'src/app/interface/client.interface';
import { ClientService } from 'src/app/service/client/client.service';
import { Web3Service } from 'src/app/web3-utils/web3.service';

declare let require: any;
const clientContract_artifacts = require("../../../../../build/contracts/ClientContract.json");

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit, OnDestroy {
  
  clientArtifact: any;
  model = {
    sender: "",
    amount: 5,
    receiver: "",
    spender: "",
    accountBalance: "",
    balance: 0,
    account: ""
  };
  accounts: string[] = [];
  clientForm!: FormGroup;
  projectForm!: FormGroup;
  clients: ClientInterface[] = [];

  constructor(
    private web3Service: Web3Service,
    private clientService: ClientService
  ) { }

  private _subscription: Subscription = new Subscription();
  private finalise = new Subject<void>();
  
  ngOnInit(): void {
    this.createClientForm();
    this.getAllClients();
    this.watchAccount();
    this.web3Service
    .artifactsToContract(clientContract_artifacts)
    .then(HitsaTokenAbstraction => {
      this.clientArtifact = HitsaTokenAbstraction;
      this.clientArtifact.deployed().then((deployed: any) => {
        console.log('deployed is printing', deployed);
      });
    });

  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      // this.refreshBalance();
      this.refreshAccountBalance();
    });
  }

  async refreshAccountBalance() {
    this.model.accountBalance = this.web3Service.web3.utils.fromWei(
      await this.web3Service.web3.eth.getBalance(this.accounts[0])
    );
    console.log(this.model.accountBalance);
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe({
      next: (obj: any) => {
        this.clients = obj;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  createClientForm() {
    this.clientForm = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(0, [Validators.required]),
    }); 

    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required]),
      clientId: new FormControl(0, [Validators.required]),
    });  
  }

  selectClient(client: ClientInterface) {
    this.projectForm.get("clientId")?.setValue(client.id);
    console.log(this.projectForm.value);
  }

  registerClient() {
    const payload: ClientInterface = this.clientForm.value;

    this.clientService.register(payload).subscribe({
      next: (obj: any) => {
        console.log(obj)
      },
      error: (err: any) => {
        console.log(err);
      }
    })      
  }

  async createProject() {

    let deployedClientContract;
    await this.clientArtifact.deployed().then((clientContract: any) => {
      deployedClientContract = clientContract;
    })
    let newContract: any = await this.web3Service.deployContract(clientContract_artifacts, this.model, deployedClientContract);
    if(newContract && newContract.options != null) {
      let payload: ProjectInterface = this.projectForm.value;
    payload = {
      ...payload,
      address: newContract.options.address,
    }

    console.log("calling api", newContract);
    this.clientService.createClientProject(payload).subscribe((obj: any) => {
      console.log(obj);
    });
    }

  }

  ngOnDestroy(): void {
    this.finalise.next();
    this.finalise.complete();
    this._subscription.unsubscribe();
  }

}

