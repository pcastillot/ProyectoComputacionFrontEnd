import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DataService } from 'src/app/data.service';
import { Comunidad } from 'src/app/modelo/comunidad';
import { Municipio } from 'src/app/modelo/municipio';
import { Provincia } from 'src/app/modelo/provincias';
import { environment } from 'src/environments/environment';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-vivir',
  templateUrl: './vivir.component.html',
  styleUrls: ['./vivir.component.css']
})
export class VivirComponent implements OnInit {
  
  @ViewChild('comunidad')
  public comunidadObj: DropDownListComponent;
  @ViewChild('provincia')
  public provinciaObj: DropDownListComponent;
  @ViewChild('municipio')
  public municipioObj: DropDownListComponent;
  @ViewChild('btnProvincia')
  public btnProvincia: ButtonComponent;
  @ViewChild('btnBuscar')
  public btnBuscar: ButtonComponent;

  constructor(private dataService: DataService) {
  }

  municipios: Municipio[] = [];
  provincias: Provincia[] = [];
  comunidades: Comunidad[] = [];
  
  ngOnInit(): void {
    this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any)=>{
      this.comunidades = data;
      console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.comunidadObj.change.call("onComunidadChange");
  }

  // maps the appropriate column to fields property for country DropDownList
  public comunidadesFields: Object = { text: 'TEXTO_AUTONOMIA', value: 'CODAUTO' };
  // maps the appropriate column to fields property for state DropDownList
  public provinciasFields: Object = { text: 'NOMBRE', value: 'CODPROV' };
  // maps the appropriate column to fields property for city DropDownList
  public municipiosFields: Object = { text: 'MUNICIPIO', value: 'CODMU' };


  //set the placeholder to country DropDownList input
  public comunidadWatermark: string = "Selecciona una comunidad";
  //set the placeholder to state DropDownList input
  public provinciaWatermark: string = "Selecciona una provincia";
  //set the placeholder to city DropDownList input
  public municipioWatermark: string = "Selecciona un municipio";



  public onComunidadChange(): void {

    console.log(this.comunidadObj.text);

    this.dataService.sendGetRequest(environment.getProvincias_comunidad + this.comunidadObj.value).subscribe((data: any)=>{
      console.log(data);
      if(this.comunidadObj.text != null){
        document.getElementById('errorComunidad')!.hidden = true;
        this.btnProvincia.disabled = false;

        this.provincias = data;
        // enable the state DropDownList
        this.provinciaObj.enabled = true;
        //clear the existing selection.
        this.provinciaObj.text = "";
        // bind the property changes to state DropDownList
        this.provinciaObj.dataBind();
        //clear the existing selection in city DropDownList
        this.municipioObj.text = "";
        //disabe the city DropDownList
        this.municipioObj.enabled = false;
        //bind the property cahnges to City DropDownList
        this.municipioObj.dataBind();
      }

      else{
        document.getElementById('errorComunidad')!.hidden = false;

      }

      
    });

  }

  public provinciaChange(): void {

    if(this.provinciaObj.text != null){
      document.getElementById('errorProvincia')!.hidden = true;
      this.dataService.sendGetRequest(environment.getMunicipios_provicia + this.provinciaObj.value).subscribe((data: any)=>{
        this.municipios = data;
        // enable the city DropDownList
        this.municipioObj.enabled = true;
        //clear the existing selection
        this.municipioObj.text = "";
        // bind the property change to city DropDownList
        this.municipioObj.dataBind();
      });
    }


    else{
      document.getElementById('errorProvincia')!.hidden = false;

    }
      
  }

  public prueba(): void{
    alert("hola");
  }

  public buscar(): void{
    if(this.municipioObj.text != null){
      document.getElementById('errorMunicipio')!.hidden = true;
      alert("Buscando...")
    }

    else{
      document.getElementById('errorMunicipio')!.hidden = false;
    }
  }

}