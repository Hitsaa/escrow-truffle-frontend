import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeveloperInterface } from 'src/app/interface/developer.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private _httpClient: HttpClient) { }

  registerDeveloper(developer: DeveloperInterface) {
    const url = environment.apiUrl+`developer/register`;
    return this._httpClient.post<any>(url, developer);
  }

  getAllDevelopers() {
    const url = environment.apiUrl+`developer/list/all`;
    return this._httpClient.get<any>(url);
  }

}
