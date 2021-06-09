import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(private router: Router) { }
  public dataSource: any[];

  public headerTitle: string = "Resultados de su búsqueda";
  public cssClass: string = 'e-list-template';

  ngOnInit(): void {
    this.dataSource = [{
      "id": "1",
      "titulo": "Colegio 1",
      "descripcion": "descripcion colegio 1",
      "direccion": "direccion colegio 1",
      "tipo": "colegio"
    },
    {
      "id": "2",
      "titulo": "Colegio 2",
      "descripcion": "descripcion colegio 2",
      "direccion": "direccion colegio 2",
      "tipo": "colegio"
    },
    {
      "id": "1",
      "titulo": "Hospital 1",
      "descripcion": "descripcion hospital 1",
      "direccion": "direccion hospital 1",
      "tipo": "hospital"
    },
    {
      "id": "2",
      "titulo": "Hospital 2",
      "descripcion": "descripcion hospital 2",
      "direccion": "direccion hospital 2",
      "tipo": "hospital"
    }]
  }

  public busqueda(event: any){
    event.preventDefault();

    alert("Buscando...");
  }

  public abrirItem(args: MouseEvent, tipo: string, id: string){
    alert("Abriendo " + tipo + " con id: " + id);
    if(tipo == "hospital")
      this.router.navigateByUrl("hospitales");
    else if(tipo =="colegio")
      this.router.navigateByUrl("colegios");
  }

}
