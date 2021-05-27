import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';

import { Comunidad } from '../../modelo/comunidad';
import { Provincia } from '../../modelo/provincias';
import { Municipio } from '../../modelo/municipio';

/**
 * @title Tree with nested nodes
 */

@Component({
  selector: 'app-turismo',
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.css']
})
export class TurismoComponent implements OnInit {

  public selectComunity: Comunidad = new Comunidad(0, '', '');

  constructor(private dataService: DataService, private router: Router) { }

  comunidades: Comunidad[] = [];

  provincias: Provincia[] = [];

  municipios: Municipio[] = [];

  ngOnInit(): void {
    this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any) => {
      this.comunidades = data;
    });
    
    this.dataService.sendGetRequest(environment.getMunicipios).subscribe((data: any) => {
      this.provincias = data;
    });

    this.dataService.sendGetRequest(environment.getProvincias).subscribe((data: any) => {
      this.municipios = data;
    });
  }
  
  onSelect(e:Event):void{
    const target = e.target as HTMLTextAreaElement;
    console.log('id -> ', target.value);
  }
}