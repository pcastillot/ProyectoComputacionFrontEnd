import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from 'src/app/componentes/registro/modelo/usuarios';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:8000/api/";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(extension:string){
    return this.httpClient.get(this.REST_API_SERVER + extension);
  }

  public addUser(usuario:Usuario){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(usuario)
    return this.httpClient.post(this.REST_API_SERVER + 'Usuarios/createUser', body,{'headers':headers})
  }
}
