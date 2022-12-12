import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DeveloperInterface } from 'src/app/interface/developer.interface';
import { DeveloperProjectInterface } from 'src/app/interface/DeveloperProject.interface';
import { ProjectInterface } from 'src/app/interface/project.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _httpClient: HttpClient) { }

  private projectDetail = new BehaviorSubject<ProjectInterface>(null as unknown as ProjectInterface);
  public projectDetail$ = this.projectDetail.asObservable();

  private developerDetail = new BehaviorSubject<DeveloperInterface>(null as unknown as DeveloperInterface);
  public developerDetails$ = this.developerDetail.asObservable();

  setProjectDetail(project: ProjectInterface) {
    this.projectDetail.next(project);
  }

  setDeveloperDetail(developer: DeveloperInterface) {
    this.developerDetail.next(developer);
  }

  proposeDeveloperProject(developerProject: DeveloperProjectInterface) {
    const url = environment.apiUrl+`developer-project/propose`;
    return this._httpClient.post<any>(url, developerProject);
  }

}
