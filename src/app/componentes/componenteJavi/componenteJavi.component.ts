import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DataService } from 'src/app/data.service';
import { Comunidad } from 'src/app/modelo/comunidad';
import { Municipio } from 'src/app/modelo/municipio';
import { Provincia } from 'src/app/modelo/provincias';
import { environment } from 'src/environments/environment';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckboxComponent } from 'angular-bootstrap-md';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'app-componenteJavi',
    templateUrl: './componenteJavi.component.html',
    styleUrls:['./componenteJavi.component.css']
})

export class ComponenteJaviComponent implements OnInit{    
    
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
  @ViewChild('checkboxColegios')
  public checkColegios: CheckboxComponent;
  @ViewChild('checkboxHospitales')
  public checkHospitales: CheckboxComponent;
  @ViewChild('checkboxViviendas')
  public checkViviendas: CheckboxComponent;
  @ViewChild('alertDialog')
  public alertDialog: DialogComponent;

  constructor(private dataService: DataService, private router: Router) {
  }

  municipios: Municipio[] = [];
  provincias: Provincia[] = [];
  comunidades: Comunidad[] = [];

  public alertHeader: string = 'Error';
  public alertContent: string = 'Debe seleccionar lo que desea buscar';
  public showCloseIcon: Boolean = false;
  public hidden: Boolean = false;
  public alertWidth: string = '400px';
  public target: string = 'body';
  public animationSettings: Object = { effect: 'None' };
  public visible: Boolean = true;
  public hide: any;

  public alertDlgBtnClick = (): void => {
    this.alertDialog.hide();
  }


  public alertDlgButtons: ButtonPropsModel[] = [{ 
    click: this.alertDlgBtnClick.bind(this), 
    buttonModel: { content: 'Aceptar', isPrimary: true } 
  }];
  
  ngOnInit(): void {
    this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any)=>{
      this.comunidades = data;
      console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.comunidadObj.addEventListener("change", (e:Event) => this.onComunidadChange())
    this.provinciaObj.addEventListener("change", (e:Event) => this.provinciaChange())
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

  public buscar(): void{
    if(this.municipioObj.text != null){
      document.getElementById('errorMunicipio')!.hidden = true;
      let idMunicipio = this.municipioObj.value;
      let hospitales = this.checkHospitales.checked ? 1 : 0;
      let colegios = this.checkColegios.checked ? 1 : 0;

      if(colegios === 1 || hospitales === 1){
        this.router.navigate(["busqueda", idMunicipio, colegios, hospitales]);
      }
      else{
        this.alertDialog.show();
      }
      
    }

    else{
      document.getElementById('errorMunicipio')!.hidden = false;
    }
  }

}

