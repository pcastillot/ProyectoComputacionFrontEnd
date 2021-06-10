import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { environment } from 'src/environments/environment';

import { Comunidad } from '../../modelo/comunidad';
import { Provincia } from '../../modelo/provincias';
import { Municipio } from '../../modelo/municipio';
import { Router } from '@angular/router';

import { Button } from '@syncfusion/ej2-buttons';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  idUsuario: any;
  nombreUsuario: string;
  isAdmin: boolean;

  //inicializamos 2 propiedades los titulos y filas
  @ViewChild('codauto')
  public codautoObj: Input;
  @ViewChild('autonomina')
  public autonominaObj: Input;
  @ViewChild('texto_autonomia')
  public texto_autonomiaObj: Input;
  @ViewChild('btnAgregar')
  public btnAgregarObj: Button;

  comunidades: Comunidad[] = [];
  titulosColumnas = ['CODAUTO', 'AUTONOMIA', 'TEXTO_AUTONOMIA'];
  idComunidades: number[] = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any) => {
      this.comunidades = data;
      console.log(data);

      for (let i = 0; i < this.comunidades.length; i++) {
        const id: number = this.comunidades[i].CODAUTO;
        this.idComunidades.push(id)
      }
    });

    // usuario
    this.idUsuario = null;

    if (localStorage.getItem("idSession")) {
      this.idUsuario = localStorage.getItem("idSession");

      this.dataService.sendGetRequest(environment.getUsuarios + this.idUsuario).subscribe((data: any) => {
        this.nombreUsuario = data.nombre + " " + data.apellido;
        let rol = data.rol;
        rol == 0 ? this.isAdmin = false : this.isAdmin = true;
      })


    }
  }

  comunida: Comunidad = new Comunidad(0, '', '');

  borrarElemento(indice: number, comunidad: Comunidad) {
    this.comunidades.splice(indice, 1);//borramos el elemento espesificado
    this.comunida = comunidad;
    alert("Elemento borrado con exito.");
  }

  codauto: number = 0;
  autonomina: string = '';
  texto_autonomia: string = '';

  agregarComunidad() {
    if (this.codauto != 0 && this.autonomina != null && this.texto_autonomia != null) {
      let comunidadNueva: Comunidad = new Comunidad(this.codauto, this.autonomina.toUpperCase(), this.texto_autonomia.toUpperCase());
      this.comunidades.push(comunidadNueva);//introducimos el nuevo elemento
      console.log(comunidadNueva);
    }
  }

  opcionSeleccionado: number = 0;
  idItem: number = 0;
  editAtonomia: string = '';
  editTexto_autonomia: string = '';
  editarComunidad() {
    console.log('id: ' + this.idItem);
    console.log('autonomia: ' + this.editAtonomia);
    console.log('texto autonomia: ' + this.editTexto_autonomia);
    // buscar el elemento
    //const com:any | Comunidad  = this.comunidades.find(x => x.CODAUTO == this.idItem);

    let rompebucle: boolean = true;
    let aux: number = 0;

    while (rompebucle) {
      let element = this.comunidades[aux];
      if (element.CODAUTO == this.opcionSeleccionado) {
        console.log(element);

        element.AUTONOMIA = this.editAtonomia;
        element.TEXTO_AUTONOMIA = this.editTexto_autonomia;
        this.comunidades[aux] = element;
        console.log('editado: ');
        console.log(element);

        rompebucle = false;
      } else if (aux > this.comunidades.length) {
        rompebucle = false;
      }
      aux++;
    }
  }
  // captura el campo 
  capturar() {
    this.idItem = this.opcionSeleccionado;
  }
  //FUNCIONA-> funcion que borra el dato por medio de la api
  borrarDb(indice: number, comunidad: Comunidad) {
    let borrado = 0;
    this.dataService.delete(environment.getComunidades + comunidad.CODAUTO).subscribe((data: any) => {
      borrado = data;
    });
    console.log('borrado?: ' + borrado);
  }

  provinciasFromComunidad: Provincia[] = [];
  seleccionar(indice: number, comunidad: Comunidad){
    let idComunidad = comunidad.CODAUTO;
    this.dataService.sendGetRequest(environment.getProvinciasFromMunicipio +'/'+ idComunidad).subscribe((data:any) =>{
      this.provinciasFromComunidad = data;
    });
    console.log('tamaño: ' + this.provinciasFromComunidad.length);
  }

  municipiosFromProvincias: Municipio[] = [];
  seleccionarProvincia(provincia:Provincia){
    this.dataService.sendGetRequest(environment.getMuniFromProvincias + '/'+ provincia.CODPROV).subscribe((data:any) => {
      this.municipiosFromProvincias = data;
    });
    console.log('tamaño municipios: '+ this.municipiosFromProvincias.length);
  }

  buscar(municipio:Municipio){
    this.router.navigateByUrl("busqueda");
  }
}
