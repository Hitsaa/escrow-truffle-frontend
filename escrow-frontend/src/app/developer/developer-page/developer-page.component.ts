import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientInterface } from 'src/app/interface/client.interface';
import { DeveloperInterface } from 'src/app/interface/developer.interface';
import { ProjectInterface } from 'src/app/interface/project.interface';
import { ClientService } from 'src/app/service/client/client.service';
import { DeveloperService } from 'src/app/service/developer/developer.service';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-developer-page',
  templateUrl: './developer-page.component.html',
  styleUrls: ['./developer-page.component.scss'],
})
export class DeveloperPageComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService,
    private developerService: DeveloperService,
    private router: Router
    ) { }
  clients: ClientInterface[] = [];
  developers: DeveloperInterface[] = [];
  projects: ProjectInterface[] = [];
  selectedClient!: string;
  selectedDeveloper!: DeveloperInterface;
  developerForm!: FormGroup;
  
  ngOnInit(): void {
    this.createDeveloperForm();
    this.getAllDevelopers();
    this.getAllClients();
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

  getAllDevelopers() {
    this.developerService.getAllDevelopers().subscribe({
      next: (obj: any) => {
        console.log(obj);
        this.developers = obj;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  createDeveloperForm() {
    this.developerForm = new FormGroup({
      developerName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(0, [Validators.required]),
    });
  }


  getProjectsOfClient(client: ClientInterface) {
    this.selectedClient = client.clientName;
    this.clientService.getAllClientProjectByClientId(client.id).subscribe({
      next: (obj: any) => {
        this.projects = obj;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  registerDeveloper() {
    const payload: DeveloperInterface = this.developerForm.value;

    this.developerService.registerDeveloper(payload).subscribe({
      next: (obj: any) => {
        console.log(obj)
        this.getAllDevelopers();
      },
      error: (err: any) => {
        console.log(err);
      }
    })      

  }

  selectDeveloper(developer: DeveloperInterface) {
    this.selectedDeveloper = developer
  }

  setProjectDetail(project: ProjectInterface) {
    this.projectService.setProjectDetail(project);
    this.projectService.setDeveloperDetail(this.selectedDeveloper);
    this.router.navigate(['project-detail']);
  }

}
