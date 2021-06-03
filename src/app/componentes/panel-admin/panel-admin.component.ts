import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Column, CommandModel, Grid, GridComponent, VirtualScrollService  } from '@syncfusion/ej2-angular-grids';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
  providers: [VirtualScrollService]
})
export class PanelAdminComponent implements OnInit {

  constructor(private dataService: DataService) {}

  @ViewChild('grid')
  public gridObj: GridComponent;

  public data: Object[];
  public toolbar: string[];
  public pageSettings: Object;
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public commands: CommandModel[];

  @ViewChild('sample')
  public listObj: DropDownListComponent;
  // define the JSON of data
  public tablas: Object[] = [
      { Id: 'usuarios', Nombre: 'Usuarios' },
      { Id: 'municipios', Nombre: 'Municipios' },
      { Id: 'provincias', Nombre: 'Provincias' },
      { Id: 'comunidades', Nombre: 'Comunidades' },
      { Id: 'colegios', Nombre: 'Colegios' },
      { Id: 'hospitales', Nombre: 'Hospitales' },
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Nombre', value: 'Id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to DropDownList input element
  public waterMark: string = 'Seleccione una tabla';
  // set the value to select an item based on mapped value at initial rendering
  public value: string = 'usuarios';
  public onChange(args: any): void {
      let value: Element = document.getElementById('value')!;
      let text: Element = document.getElementById('text')!;
      // update the text and value property values in property panel based on selected item in DropDownList
      value.innerHTML = this.listObj.value.toString();
      text.innerHTML = this.listObj.text;
  }

  ngOnInit(): void {
    this.dataService.sendGetRequest(environment.getUsuarios).subscribe((data: any)=>{
      this.data = data;
    });
    this.toolbar = ['ColumnChooser'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.orderidrules = { required: true };
    this.customeridrules = { required: true };
    this.freightrules =  { required: true };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = {pageCount: 5};
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  }



  public cambiarTabla(tabla: any){

    this.gridObj.enableColumnVirtualization = false;

    if (tabla == "usuarios"){
      this.dataService.sendGetRequest(environment.getUsuarios).subscribe((data: any)=>{
        this.gridObj.columns = [];
        this.data = data;
        this.gridObj.refreshHeader();
      });
    }

    else if (tabla == "municipios"){
      this.dataService.sendGetRequest(environment.getMunicipios).subscribe((data: any)=>{
        this.gridObj.columns = [];
        this.data = data;
        this.gridObj.refreshHeader();
      });
    }

    else if (tabla == "provincias"){
      this.dataService.sendGetRequest(environment.getProvincias).subscribe((data: any)=>{
        this.gridObj.columns = [];
        this.data = data;
        this.gridObj.refreshHeader();
      });
    }

    else if (tabla == "comunidades"){
      this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any)=>{
        this.gridObj.columns = [];
        this.data = data;
        this.gridObj.refreshHeader();
      });
    }

    else if (tabla == "colegios"){
      this.dataService.sendGetRequest(environment.getColegios).subscribe((data: any)=>{
        this.gridObj.columns = [];
        this.data = data;
        this.gridObj.refreshHeader();
      });
    }
    else if (tabla == "hospitales"){
      this.dataService.sendGetRequest(environment.getHospitales).subscribe((data: any)=>{
        this.gridObj.columns = [];
        this.data = data;
        this.gridObj.refreshHeader();
        this.gridObj.enableColumnVirtualization = true;
        
      });
    }

    

    
  }


}
