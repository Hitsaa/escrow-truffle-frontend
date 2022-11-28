import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientInterface, ProjectInterface } from 'src/app/interface/client.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _httpClient: HttpClient) { }

  register(client: ClientInterface) {
    const url = environment.apiUrl+`client/register`;
    return this._httpClient.post<any>(url, client);
  }

  createClientProject(project: ProjectInterface) {
    const url = environment.apiUrl+`project/create`;
    return this._httpClient.post<any>(url, project);
  }

  getAllClients() {
    const url = environment.apiUrl+`client/list/all`;
    return this._httpClient.get<any>(url);
  }

  getAllClientProjectByClientId(id: number) {
    const url = environment.apiUrl+`client/project/${id}`;
    return this._httpClient.get<any>(url);
  }
}
