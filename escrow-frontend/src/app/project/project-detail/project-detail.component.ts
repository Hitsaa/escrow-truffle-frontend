import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectInterface } from 'src/app/interface/client.interface';
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

  // @Input()
  // projectName: string = '';
  // @Input()
  // projectId!: number;
  // @Input()
  // address: string = '';

  projectDetail!: ProjectInterface;
  private subscription = new Subscription();

  ngOnInit(): void {
    console.log('on init called')
    const projectSubscription = this.projectService.projectDetail$.subscribe({
      next: (project: ProjectInterface) => {
        console.log('in project',project);
        this.projectDetail = project;
      }
    })

    this.subscription.add(projectSubscription);
  }

  ngOnDestroy(): void {
    console.log('on destroy called')
      this.subscription.unsubscribe();
  }

}
