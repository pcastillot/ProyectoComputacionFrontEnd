import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';

import { Comunidad } from '../../modelo/comunidad';
import { Button } from '@syncfusion/ej2-buttons';

@Component({
    selector: 'app-componenteJavi',
    templateUrl: './componenteJavi.component.html',
    styleUrls:['./componenteJavi.component.css']
})

export class ComponenteJaviComponent implements OnInit{    
    rellenos: Comunidad[] = [];
    encabezados = ['TEXTO_AUTONOMIA', 'ID'];
    constructor(private dataService: DataService) { }
  
    ngOnInit(): void {
      this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any) => {
        this.rellenos = data;
        console.log(data);
      });
    }
  
    CeldaTexto: Comunidad = new Comunidad(0, '', '');
  
    delete(id_celdatexto:number, CeldaTexto:Comunidad){
      this.rellenos.splice(id_celdatexto, 1);
      this.CeldaTexto = CeldaTexto;
    }
  
    id: number = 0;
    titulo_1:string = '';

    // EL SEGUNDO TITULO NO LO VAMOS A UTILIZAR AUNQUE NECESITAMOS SACARLOS DEBIDO A LA PETICION DE LA API
    titulo_2:string = '';
  
    add(){
        let comunidadNueva:Comunidad = new Comunidad(this.id, this.titulo_1.toUpperCase(), this.titulo_2.toUpperCase());
        this.rellenos.push(comunidadNueva);//introducimos el nuevo elemento
        console.log(comunidadNueva);
    }
}

