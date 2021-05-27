import { Injectable } from '@angular/core';
import { ComunidadI, ProvinciaI, MunicipioI } from '../modelo/model.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private comunidad:ComunidadI[];
  constructor() { }
}
