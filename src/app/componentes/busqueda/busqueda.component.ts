import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor() { }
  public dataSource: any[];

  public headerTitle: string = "Resultados de su búsqueda";
  public cssClass: string = 'e-list-template';

  ngOnInit(): void {
    this.dataSource = [{
      "titulo": "Colegio 1",
      "descripcion": "descripcion colegio 1",
      "direccion": "direccion colegio 1"
    },
    {
      "titulo": "Colegio 2",
      "descripcion": "descripcion colegio 2",
      "direccion": "direccion colegio 2"
    },
    {
      "titulo": "Hospital 1",
      "descripcion": "descripcion hospital 1",
      "direccion": "direccion hospital 1"
    },
    {
      "titulo": "Hospital 2",
      "descripcion": "descripcion hospital 2",
      "direccion": "direccion hospital 2"
    }]
  }

  public onActionComplete(event: any){

  }


  public busqueda(event: any){
    event.preventDefault();

    alert("Buscando...");
  }

}
