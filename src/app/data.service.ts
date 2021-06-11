import { Injectable, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Usuario} from 'src/app/modelo/usuarios';
import { Colegio } from 'src/app/modelo/colegio';
import { environment } from 'src/environments/environment';
import { Hospital } from './modelo/hospital';
import { Municipio } from './modelo/municipio';
import { Provincia } from './modelo/provincias';
import { Comunidad } from './modelo/comunidad';
import { HospitalesComponent } from './componentes/hospitales/hospitales.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  private REST_API_SERVER = "http://localhost:8000/api/";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(extension:string){
    return this.httpClient.get(this.REST_API_SERVER + extension);
  }

  public delete(extension: string) {
    return this.httpClient.delete(this.REST_API_SERVER + extension);
  }

  public getComunidades(comunidades:string){
    return this.httpClient.get(this.REST_API_SERVER + comunidades);
  }
  public getUserId(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  //Adds
  public addMunicipio(municipio: Municipio){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(municipio)
    return this.httpClient.post(this.REST_API_SERVER + environment.getMunicipios, body,{'headers':headers})
  }
  
  public addProvincia(provincia: Provincia){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(provincia)
    return this.httpClient.post(this.REST_API_SERVER + environment.getProvincias, body,{'headers':headers})
  }

  public addComunidad(comunidad: Comunidad){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(comunidad)
    return this.httpClient.post(this.REST_API_SERVER + environment.getComunidades, body,{'headers':headers})
  }

  public addColegio(colegio: Colegio){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(colegio)
    return this.httpClient.post(this.REST_API_SERVER + environment.getColegios, body,{'headers':headers})
  }

  public addHospital(hospital: Hospital){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(hospital)
    return this.httpClient.post(this.REST_API_SERVER + environment.getHospitales, body,{'headers':headers})
  }

  public addUser(usuario:Usuario){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(usuario)
    return this.httpClient.post(this.REST_API_SERVER + environment.crearUser, body,{'headers':headers})
  }

  //Updates
  public updateColegio(colegio: Colegio) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(colegio);
    console.log(body);
    return this.httpClient.put(this.REST_API_SERVER + environment.getColegios + colegio.idColegio, body, { 'headers': headers })
  }

  public updateUsuario(usuario: Usuario) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(usuario)
    return this.httpClient.put(this.REST_API_SERVER + environment.getUsuarios + usuario.idUsuario, body, { 'headers': headers })
  }

  public updateHospital(hospital: Hospital) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(hospital)
    return this.httpClient.put(this.REST_API_SERVER + environment.getHospitales + hospital.CODCNH, body, { 'headers': headers })
  }

  public updateMunicipio(municipio: Municipio) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(municipio)
    return this.httpClient.put(this.REST_API_SERVER + environment.getMunicipios + municipio.CODMU, body, { 'headers': headers })
  }

  public updateProvincia(provincia: Provincia) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(provincia)
    return this.httpClient.put(this.REST_API_SERVER + environment.getProvincias + provincia.CODPROV, body, { 'headers': headers })
  }

  public updateComunidad(comunidad: Comunidad) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(comunidad)
    return this.httpClient.put(this.REST_API_SERVER + environment.getComunidades + comunidad.CODAUTO, body, { 'headers': headers })
  }

  
}
