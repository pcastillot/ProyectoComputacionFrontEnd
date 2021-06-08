import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from 'src/app/modelo/usuarios';
import { Colegio } from 'src/app/modelo/colegio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:8000/api/";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(extension:string){
    return this.httpClient.get(this.REST_API_SERVER + extension);
  }

  public getComunidades(comunidades:string){
    return this.httpClient.get(this.REST_API_SERVER + comunidades);
  }
  public getUserId(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public updateColegio(colegio: Colegio) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(colegio)
    return this.httpClient.put(this.REST_API_SERVER + environment.crearUser, body, { 'headers': headers })
  }

  public addUser(usuario:Usuario){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(usuario)
    return this.httpClient.post(this.REST_API_SERVER + environment.crearUser, body,{'headers':headers})
  }
}
