import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { ActionBeginEventArgs, ActionCompleteEventArgs, DropDownListComponent, ListBoxChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ActionEventArgs, CellSaveArgs, Column, commandClick, CommandClickEventArgs, CommandModel, DialogEditEventArgs, EditEventArgs, Grid, GridComponent, SaveEventArgs, SearchSettingsModel, ToolbarService, VirtualScrollService  } from '@syncfusion/ej2-angular-grids';
import { AddEventArgs, ClickEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { IconsModule } from 'angular-bootstrap-md';
import { element } from 'protractor';
import { DataService } from 'src/app/data.service';
import { Colegio } from 'src/app/modelo/colegio';
import { Comunidad } from 'src/app/modelo/comunidad';
import { Hospital } from 'src/app/modelo/hospital';
import { Municipio } from 'src/app/modelo/municipio';
import { Provincia } from 'src/app/modelo/provincias';
import { Usuario } from 'src/app/modelo/usuarios';
import { environment } from 'src/environments/environment';
import { isJSDocImplementsTag } from 'typescript';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
  providers: [VirtualScrollService, ToolbarService]
})
export class PanelAdminComponent implements OnInit, AfterViewInit {

  

  @ViewChild('gridUsuarios')
  public gridObjUsuarios: GridComponent;

  @ViewChild('gridMunicipios')
  public gridObjMunicipios: GridComponent;

  @ViewChild('gridProvincias')
  public gridObjProvincias: GridComponent;

  @ViewChild('gridComunidades')
  public gridObjComunidades: GridComponent;

  @ViewChild('gridColegios')
  public gridObjColegios: GridComponent;
  
  @ViewChild('gridHospitales')
  public gridObjHospitales: GridComponent;

  @ViewChild('tablas')
  public tablasObj: DropDownListComponent;

  @ViewChild('alertDialog')
  public alertDialog: DialogComponent;

  public dataUsuarios: Usuario[];
  public dataMunicipios: Municipio[];
  public dataProvincias: Provincia[];
  public dataComunidades: Comunidad[];
  public dataColegios: Colegio[];
  public dataHospitales: Hospital[];


  public toolbar: any[];
  public pageSettings: Object;
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public commands: CommandModel[];
  public seleccionado: any;
  public value: string;
  public searchOptions: SearchSettingsModel;

  public alertHeader: string = '';
  public alertContent: string = '';
  public showCloseIcon: Boolean = false;
  public hidden: Boolean = false;
  public alertWidth: string = '400px';
  public target: string = 'body';
  public animationSettings: Object = { effect: 'None' };
  public visible: Boolean = true;
  public hide: any;

  //Validators
  public emailValidator: object;
  public idValidator: object;
  public requiredValidator: object;
  public rolValidator: object;
  public numberValidator: object;

  @ViewChild('tablasList')
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
  
  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
    
    this.dataService.sendGetRequest(environment.getUsuarios).subscribe((data: any)=>{
      this.dataUsuarios = data;
    });

    this.dataService.sendGetRequest(environment.getMunicipios).subscribe((data: any)=>{
      this.dataMunicipios = data;
    });

    this.dataService.sendGetRequest(environment.getProvincias).subscribe((data: any)=>{
      this.dataProvincias = data;
    });

    this.dataService.sendGetRequest(environment.getComunidades).subscribe((data: any)=>{
      this.dataComunidades = data;
    });

    this.dataService.sendGetRequest(environment.getColegios).subscribe((data: any)=>{
      this.dataColegios = data;
    });

    this.dataService.sendGetRequest(environment.getHospitales).subscribe((data: any)=>{
      this.dataHospitales = data;
    });

    this.searchOptions = { operator: 'contains', ignoreCase: true };
    this.seleccionado = "usuarios";

    this.value = 'usuarios';
    this.toolbar = [{ text: 'Añadir', tooltipText: 'Añadir', id: 'Add', prefixIcon:'e-add' }, 'Search', 'ColumnChooser'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top', showDeleteConfirmDialog: true, showConfirmDialog: true, mode: 'Dialog' };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = {pageCount: 5};
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat'} },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];

    //Validators
    this.idValidator = {required: true, number: true};
    this.emailValidator = {email: true};
    this.requiredValidator = {required: true};
    this.rolValidator = {range: [0,1]}
    this.numberValidator = {number: true};
    
  }

  ngAfterViewInit():void{
    this.gridObjUsuarios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
    this.gridObjUsuarios.addEventListener("actionComplete", (e: any) => this.actionComplete(e));
    
    this.listObj.addEventListener("change", (e:ListBoxChangeEventArgs) => this.cambiarTabla(e))
  }

  public alertDlgButtons: ButtonPropsModel[] = [{ 
    click: this.alertDlgBtnClick.bind(this), 
    buttonModel: { content: 'Aceptar', isPrimary: true } 
  }];

  public alertDlgBtnClick(){
    this.alertDialog.hide();
  }

  public dataSourceChanged(args: DataSourceChangedEventArgs){
    console.log("dataSourceChanged fired");
    alert(args.data);
  }

  private closeDialog(dialog: any){

  }

  public actionComplete(args: any): void {

    switch(this.seleccionado){
      case 'usuarios': {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          const dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Datos del usuario ' + args.rowData["idUsuario"] : 'Nuevo usuario';
          let btnGuardar: HTMLElement = dialog.element.querySelectorAll(".e-primary")[0];
          btnGuardar.innerHTML = "Guardar";
          btnGuardar.className = btnGuardar.className + " col-12 center";
          dialog.element.querySelectorAll(".e-flat")[2].remove();
        }
    
        else if (args.requestType === 'save'){
          let usuario: Usuario = args.data;
          this.dataService.sendGetRequest(environment.getUsuarios + usuario.idUsuario).subscribe((data: any) => {
            console.log(data);
            if(data==null){
              this.dataService.addUser(usuario).subscribe((data: any) => {
                this.alertHeader = "Usuario agregado";
                this.alertContent = "Usuario con id " + usuario.idUsuario + " agregado con éxito";
                this.alertDialog.show();
              });
              
            }

            else{
              this.dataService.updateUsuario(usuario).subscribe((data: any) => {
                this.alertHeader = "Usuario actualizado";
                this.alertContent = "Usuario con id " + usuario.idUsuario + " actualizado con éxito";
                this.alertDialog.show();
              })
            }
          });
          
        }

        else if (args.requestType === 'delete'){
          let idUsuario = args.data[0].idUsuario;
          this.dataService.delete(environment.getUsuarios + idUsuario).subscribe((data: any) => {
            this.alertHeader = "Usuario eliminado";
            this.alertContent = "Usuario con id " + idUsuario + " eliminado con éxito";
            this.alertDialog.show();
          });
        }
        break;
      }

      case 'municipios': {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          const dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Datos del municipio ' + args.rowData["CODMU"] : 'Nuevo municipio';
          let btnGuardar: HTMLElement = dialog.element.querySelectorAll(".e-primary")[0];
          btnGuardar.innerHTML = "Guardar";
          btnGuardar.className = btnGuardar.className + " col-12 center";
          dialog.element.querySelectorAll(".e-flat")[2].remove();
        }
    
        else if (args.requestType === 'save'){
          let municipio: Municipio = args.data;
          this.dataService.sendGetRequest(environment.getMunicipios + municipio.CODMU).subscribe((data: any) => {
            if(data==null){
              this.dataService.addMunicipio(municipio).subscribe((data: any) => {
                this.alertHeader = "Municipio agregado";
                this.alertContent = "Municipio con id " + municipio.CODMU + " agregado con éxito";
                this.alertDialog.show();
              });
              
            }

            else{
              this.dataService.updateMunicipio(municipio).subscribe((data: any) => {
                this.alertHeader = "Municipio actualizado";
                this.alertContent = "Municipio con id " + municipio.CODMU + " actualizado con éxito";
                this.alertDialog.show();
              })
            }
          });
        }

        else if (args.requestType === 'delete'){
          let idMunicipio = args.data[0].CODMU;
          this.dataService.delete(environment.getMunicipios + idMunicipio).subscribe((data: any) => {
            this.alertHeader = "Municipio eliminado";
            this.alertContent = "Municipio con id " + idMunicipio + " eliminado con éxito";
            this.alertDialog.show();
          });
        }
        break;
      }

      case 'provincias': {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          const dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Datos de la provincia ' + args.rowData["CODPROV"] : 'Nueva provincia';
          let btnGuardar: HTMLElement = dialog.element.querySelectorAll(".e-primary")[0];
          btnGuardar.innerHTML = "Guardar";
          btnGuardar.className = btnGuardar.className + " col-12 center";
          dialog.element.querySelectorAll(".e-flat")[2].remove();
        }
    
        else if (args.requestType === 'save'){
          let provincia: Provincia = args.data;
          this.dataService.sendGetRequest(environment.getProvincias + provincia.CODPROV).subscribe((data: any) => {
            if(data==null){
              this.dataService.addProvincia(provincia).subscribe((data: any) => {
                this.alertHeader = "Provincia agregada";
                this.alertContent = "Provincia con id " + provincia.CODPROV + " agregada con éxito";
                this.alertDialog.show();
              });
              
            }

            else{
              this.dataService.updateProvincia(provincia).subscribe((data: any) => {
                this.alertHeader = "Provincia actualizada";
                this.alertContent = "Provincia con id " + provincia.CODPROV + " actualizada con éxito";
                this.alertDialog.show();
              })
            }
          });
        }

        else if (args.requestType === 'delete'){
          let idProvincia = args.data[0].CODPROV;
          this.dataService.delete(environment.getProvincias + idProvincia).subscribe((data: any) => {
            this.alertHeader = "Provincia eliminada";
            this.alertContent = "Provincia con id " + idProvincia + " eliminada con éxito";
            this.alertDialog.show();
          });
        }
        break;
      }

      case 'comunidades': {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          const dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Datos de la comunidad ' + args.rowData["CODAUTO"] : 'Nueva comunidad';
          let btnGuardar: HTMLElement = dialog.element.querySelectorAll(".e-primary")[0];
          btnGuardar.innerHTML = "Guardar";
          btnGuardar.className = btnGuardar.className + " col-12 center";
          dialog.element.querySelectorAll(".e-flat")[2].remove();
        }
    
        else if (args.requestType === 'save'){
          let comunidad: Comunidad = args.data;
          this.dataService.sendGetRequest(environment.getComunidades + comunidad.CODAUTO).subscribe((data: any) => {
            if(data==null){
              this.dataService.addComunidad(comunidad).subscribe((data: any) => {
                this.alertHeader = "Comunidad agregada";
                this.alertContent = "Comunidad con id " + comunidad.CODAUTO + " agregada con éxito";
                this.alertDialog.show();
              });
              
            }

            else{
              this.dataService.updateComunidad(comunidad).subscribe((data: any) => {
                console.log(data);
                this.alertHeader = "Comunidad actualizada";
                this.alertContent = "Comunidad con id " + comunidad.CODAUTO + " actualizada con éxito";
                this.alertDialog.show();
              })
            }
          });

        }

        else if (args.requestType === 'delete'){
          let idComunidad = args.data[0].CODAUTO;
          this.dataService.delete(environment.getComunidades + idComunidad).subscribe((data: any) => {
            console.log(data);
            this.alertHeader = "Comunidad eliminada";
            this.alertContent = "Comunidad con id " + idComunidad + " eliminada con éxito";
            this.alertDialog.show();
          })
          
        }
        break;
      }

      case 'colegios': {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          const dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Datos del colegio ' + args.rowData["idColegio"] : 'Nuevo colegio';
          let btnGuardar: HTMLElement = dialog.element.querySelectorAll(".e-primary")[0];
          btnGuardar.innerHTML = "Guardar";
          btnGuardar.className = btnGuardar.className + " col-12 center";
          dialog.element.querySelectorAll(".e-flat")[2].remove();
        }
    
        else if (args.requestType === 'save'){
          let colegio: Colegio = args.data;
          console.log(colegio);
          this.dataService.sendGetRequest(environment.getColegios + colegio.idColegio).subscribe((data: any) => {
            if(data==null){
              this.dataService.addColegio(colegio).subscribe((data: any) => {
                this.alertHeader = "Colegio agregado";
                this.alertContent = "Colegio con id " + colegio.idColegio + " agregado con éxito";
                this.alertDialog.show();
              });
              
            }

            else{
              this.dataService.updateColegio(colegio).subscribe((data: any) => {
                this.alertHeader = "Colegio actualizado";
                this.alertContent = "Colegio con id " + colegio.idColegio + " actualizado con éxito";
                this.alertDialog.show();
              })
            }
          });
        }

        else if (args.requestType === 'delete'){
          let idColegio = args.data[0].idColegio;
          this.dataService.delete(environment.getColegios + idColegio).subscribe((data: any) => {
            this.alertHeader = "Colegio eliminado";
            this.alertContent = "Colegio con id " + idColegio + " eliminado con éxito";
            this.alertDialog.show();
          })
        }
        break;
      }

      case 'hospitales': {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
          const dialog = args.dialog;
          // change the header of the dialog
          dialog.header = args.requestType === 'beginEdit' ? 'Datos del hospital ' + args.rowData["CODCNH"] : 'Nuevo hospital';
          let btnGuardar: HTMLElement = dialog.element.querySelectorAll(".e-primary")[0];
          btnGuardar.innerHTML = "Guardar";
          btnGuardar.className = btnGuardar.className + " col-12 center";
          dialog.element.querySelectorAll(".e-flat")[2].remove();
        }
    
        else if (args.requestType === 'save'){
          let hospital: Hospital = args.data;
          console.log(hospital);
          this.dataService.sendGetRequest(environment.getHospitales + hospital.CODCNH).subscribe((data: any) => {
            if(data==null){
              this.dataService.addHospital(hospital).subscribe((data: any) => {
                this.alertHeader = "Hospital agregado";
                this.alertContent = "Hospital con id " + hospital.CODCNH + " agregado con éxito";
                this.alertDialog.show();
              });
              
            }

            else{
              this.dataService.updateHospital(hospital).subscribe((data: any) => {
                this.alertHeader = "Hospital actualizado";
                this.alertContent = "Hospital con id " + hospital.CODCNH + " actualizado con éxito";
                this.alertDialog.show();
              })
            }
          });
        }

        else if (args.requestType === 'delete'){
          let idHospital = args.data[0].CODCNH;
          this.dataService.delete(environment.getHospitales + idHospital).subscribe((data: any) => {
            this.alertHeader = "Hospital eliminado";
            this.alertContent = "Hospital con id " + idHospital + " eliminado con éxito";
            this.alertDialog.show();
          })
        }
        break;
      }
      
    }
    
  }


  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  toolbarClick(args: ClickEventArgs): void {
    switch(this.seleccionado){
      case 'usuarios': {
        if(args.item.text == 'Añadir'){
          this.gridObjUsuarios.addRecord();
        }
        break;
      }
      
      case 'municipios': {
        if(args.item.text == 'Añadir'){
          this.gridObjMunicipios.addRecord();
        }
        break;
      }
      case 'provincias': {
        if(args.item.text == 'Añadir'){
          this.gridObjProvincias.addRecord();
        }
        break;
      }
      case 'comunidades': {
        if(args.item.text == 'Añadir'){
          this.gridObjComunidades.addRecord();
        }
        break;
      }
      case 'hospitales': {
        if(args.item.text == 'Añadir'){
          this.gridObjHospitales.addRecord();
        }
        break;
      }
      case 'colegios': {
        if(args.item.text == 'Añadir'){
          this.gridObjColegios.addRecord();
        }
        break;
      }

    }
    
  }

  public cambiarTabla(args: ListBoxChangeEventArgs) {
    let tabla = args.value;
    this.seleccionado = tabla;
    switch (tabla){
      case 'usuarios': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjUsuarios.addEventListener("actionComplete", (e:any) => this.actionComplete(e));
          this.gridObjUsuarios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }
      
      case 'municipios': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjMunicipios.addEventListener("actionComplete", (e:any) => this.actionComplete(e));
          this.gridObjMunicipios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'provincias': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjProvincias.addEventListener("actionComplete", (e:any) => this.actionComplete(e));
          this.gridObjProvincias.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'comunidades': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjComunidades.addEventListener("actionComplete", (e:any) => this.actionComplete(e));
          this.gridObjComunidades.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'colegios': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjColegios.addEventListener("actionComplete", (e:any) => this.actionComplete(e));
          this.gridObjColegios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'hospitales': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjHospitales.addEventListener("actionComplete", (e:any) => this.actionComplete(e));
          this.gridObjHospitales.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }
      
    }
  }


}
