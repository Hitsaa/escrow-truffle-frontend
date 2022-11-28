import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectInterface } from 'src/app/interface/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  private projectDetail = new Subject<ProjectInterface>();
  public projectDetail$ = this.projectDetail.asObservable();

  setProjectDetail(project: ProjectInterface) {
    console.log(project);
    this.projectDetail.next(project);
  }

  getProjectDetail() {
    return this.projectDetail;
  }
}
