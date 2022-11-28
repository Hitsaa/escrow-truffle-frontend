import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientInterface, ProjectInterface } from 'src/app/interface/client.interface';
import { ClientService } from 'src/app/service/client/client.service';
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
    private router: Router
    ) { }
  clients: ClientInterface[] = [];
  projects: ProjectInterface[] = [];
  ngOnInit(): void {
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

  getProjectsOfClient(client: ClientInterface) {
    this.clientService.getAllClientProjectByClientId(client.id).subscribe({
      next: (obj: any) => {
        this.projects = obj;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  setProjectDetail(project: ProjectInterface) {
    this.projectService.setProjectDetail(project);
    this.router.navigate(['project-detail']);
  }

}
