import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeveloperInterface } from 'src/app/interface/developer.interface';
import { DeveloperProjectInterface } from 'src/app/interface/DeveloperProject.interface';
import { ProjectInterface } from 'src/app/interface/project.interface';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  constructor(
    private projectService: ProjectService
  ) { }

  projectDetail!: ProjectInterface;
  developerDetail!: DeveloperInterface;

  private subscription = new Subscription();

  ngOnInit(): void {
    const projectSubscription = this.projectService.projectDetail$.subscribe({
      next: (project: ProjectInterface) => {
        this.projectDetail = project;
      }
    })

    const developerSubscription = this.projectService.developerDetails$.subscribe({
      next: (developer: DeveloperInterface) => {
        this.developerDetail = developer;
      }
    })

    this.subscription.add(projectSubscription);
    this.subscription.add(developerSubscription);
  }

  proposeProject() {
    let developerProject: DeveloperProjectInterface = {
      developer: this.developerDetail,
      project: this.projectDetail,      
    }
      this.projectService.proposeDeveloperProject(developerProject).subscribe({
        next: (obj) => {
          console.log(obj);
        }
      })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
