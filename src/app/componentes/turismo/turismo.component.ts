import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';

import { Comunidad } from '../../modelo/comunidad';
import { Provincia } from '../../modelo/provincias';
import { Municipio } from '../../modelo/municipio';




interface ArbolComunidades{
  Comunidad:string;
  children?:ArbolComunidades[];
}

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-turismo',
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.css']
})
export class TurismoComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  comunidades: Comunidad[] = [];
  // en la primera va el id de comunidades y el segundo el array de cada comunidad con sus provincias
  provincias: Provincia[][] = [];
  // en la primera parte va el id de la provincia y la segunda parte la lista de municipios de cada provincia
  municipios: Municipio[][] = [];

  ngOnInit(): void {
    this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any) => {
      this.comunidades = data;
    });
    // como paratro del 7 colocar el id de cada comunidad y recoger el resultado en un array bidimencional
    this.comunidades.forEach( (value) => {
      this.dataService.sendGetRequest(environment.getProvincias_comunidad + value.getCodAuto).subscribe((data: any) => {
        this.provincias.push(data);
      });
    });

    for (let i = 0; i < this.comunidades.length; i++) {
      console.log(this.comunidades[i].getAutonomia);
    }

    for (let i = 0; i < this.provincias.length; i++) {
      for (let j = 0; i < this.provincias.length; i++) {
        this.dataService.sendGetRequest(environment.getProvincias_comunidad + this.provincias[i][j].getCodAuto).subscribe((data: any) => {
          this.provincias.push(data);
        });
      }
    }
  }


/*
  treeControl = new NestedTreeControl<ArbolComunidades>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
*/
}
