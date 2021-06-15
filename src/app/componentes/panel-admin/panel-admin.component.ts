import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DropDownListComponent, ListBoxChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { CommandClickEventArgs, CommandModel, GridComponent, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DataService } from 'src/app/data.service';
import { Colegio } from 'src/app/modelo/colegio';
import { Comunidad } from 'src/app/modelo/comunidad';
import { Hospital } from 'src/app/modelo/hospital';
import { Municipio } from 'src/app/modelo/municipio';
import { Provincia } from 'src/app/modelo/provincias';
import { Usuario } from 'src/app/modelo/usuarios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  
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

  @ViewChild('titleCard')
  public titleCard: ElementRef;

  @ViewChild('subtitleCard')
  public subtitleCard: ElementRef;

  @ViewChild('contentCard')
  public contentCard: ElementRef;

  @ViewChild('titleDataCard')
  public titleDataCard: ElementRef;

  @ViewChild('contentDataCard')
  public contentDataCard: ElementRef;


  public dataUsuarios: Object[];
  public dataMunicipios: Object[];
  public dataProvincias: Object[];
  public dataComunidades: Object[];
  public dataColegios: Object[];
  public dataHospitales: Object[];


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


  public usuario: Usuario;
  
  constructor(private dataService: DataService, private renderer: Renderer2) {
    
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
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top', showDeleteConfirmDialog: true, showConfirmDialog: true };
    this.editparams = { params: { popupHeight: '300px' }};
    this.pageSettings = {pageCount: 5};
    this.commands = [    { type: 'None', buttonOption: { iconCss: 'e-icons e-copy', cssClass: 'e-flat' } },
      { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat'} },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];


    
    
    
    
    
  }

  ngAfterViewInit():void{
    this.gridObjUsuarios.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
    this.gridObjUsuarios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
    this.listObj.addEventListener("change", (e:ListBoxChangeEventArgs) => this.cambiarTabla(e))

    let idUsuario = localStorage.getItem("idSession");
    this.dataService.sendGetRequest(environment.getUsuarios + idUsuario).subscribe((data: any)=>{
      this.usuario = data;
      let title = "Bienvenido al panel "+this.usuario.nombre+" "+this.usuario.apellido;
      this.renderer.appendChild(this.titleCard.nativeElement, this.renderer.createText(title));

      let subtitle = "Rol: " + this.usuario.rol + "\nCorreo: " + this.usuario.correo;
      this.renderer.appendChild(this.subtitleCard.nativeElement, this.renderer.createText(subtitle));

      let content = "Aquí podrás visualizar los datos de todos los elementos de la base de datos";
      this.renderer.appendChild(this.contentCard.nativeElement, this.renderer.createText(content));

    });
    
  }

  public commandClick(args: CommandClickEventArgs): void {

    switch (this.seleccionado){
      case 'usuarios': {
        if (args.commandColumn?.type == 'Save'){
          let row = JSON.stringify(args.rowData);
          let usuario: Usuario = JSON.parse(row);
          alert("Guardando usuario con id: " + usuario.idUsuario + "\n" + JSON.stringify(usuario));
        }
    
        else if (args.commandColumn?.type == 'Delete'){
          let row = JSON.stringify(args.rowData);
          let usuario: Usuario = JSON.parse(row);
          alert("Elimininando: " + usuario.idUsuario);
        }
    
        else if (args.commandColumn?.type == 'None'){
          let row = JSON.stringify(args.rowData);
          let usuario: Usuario = JSON.parse(row);

          let titulo = "Usuario " + usuario.idUsuario;
          document.getElementById("titleDataCard")!.innerHTML = titulo;
          
          this.dataService.sendGetRequest(environment.getMunicipios + usuario.idMunicipio).subscribe((data: any) => {
            let content = "<p>idUsuario: " + usuario.idUsuario + "</p><p>Nombre: " + usuario.nombre + "</p><p>Apellidos: " + usuario.apellido + "</p><p>Rol: " + usuario.rol +"</p><p>Correo: " + usuario.correo + "</p><p>idMunicipio: " + usuario.idMunicipio + "</p><p>Nombre Municipio: " + data.MUNICIPIO;
            document.getElementById("contentDataCard")!.innerHTML = content;
          });

        }
        break;
      }

      case 'municipios': {
        if (args.commandColumn?.type == 'Save'){
          let row = JSON.stringify(args.rowData);
          let municipio: Municipio = JSON.parse(row);
          alert("Guardando municipio con id: " + municipio.CODMU + "\n" + JSON.stringify(municipio));
        }
    
        else if (args.commandColumn?.type == 'Delete'){
          let row = JSON.stringify(args.rowData);
          let municipio: Municipio = JSON.parse(row);
          alert("Elimininando: " + municipio.CODMU);
        }

        else if (args.commandColumn?.type == 'None'){
          let row = JSON.stringify(args.rowData);
          let municipio: Municipio = JSON.parse(row);

          let titulo = "Municipio " + municipio.CODMU;
          document.getElementById("titleDataCard")!.innerHTML = titulo;

          let content = "<p>idMunicipio: " + municipio.CODMU + "</p><p>Nombre: " + municipio.MUNICIPIO + "</p><p>idProvincia: " + municipio.CODPROV;
          document.getElementById("contentDataCard")!.innerHTML = content;

        }
        break;
      }

      case 'provincias': {
        if (args.commandColumn?.type == 'Save'){
          let row = JSON.stringify(args.rowData);
          let provincia: Provincia = JSON.parse(row);
          alert("Guardando provincia con id: " + provincia.CODPROV + "\n" + JSON.stringify(provincia));
        }
    
        else if (args.commandColumn?.type == 'Delete'){
          let row = JSON.stringify(args.rowData);
          let provincia: Provincia = JSON.parse(row);
          alert("Elimininando: " + provincia.CODPROV);
        }
        
        else if (args.commandColumn?.type == 'None'){
          let row = JSON.stringify(args.rowData);
          let provincia: Provincia = JSON.parse(row);

          let titulo = "Provincia " + provincia.CODPROV;
          document.getElementById("titleDataCard")!.innerHTML = titulo;

          let content = "<p>idProvincia: " + provincia.CODPROV + "</p><p>Nombre: " + provincia.NOMBRE + "</p><p>idAutonomia: " + provincia.CODAUTO;
          document.getElementById("contentDataCard")!.innerHTML = content;

        }
        break;
      }

      case 'comunidades': {
        if (args.commandColumn?.type == 'Save'){
          let row = JSON.stringify(args.rowData);
          let comunidad: Comunidad = JSON.parse(row);
          alert("Guardando comunidad con id: " + comunidad.CODAUTO + "\n" + JSON.stringify(comunidad));
        }
    
        else if (args.commandColumn?.type == 'Delete'){
          let row = JSON.stringify(args.rowData);
          let comunidad: Comunidad = JSON.parse(row);
          alert("Elimininando: " + comunidad.CODAUTO);
        }

        else if (args.commandColumn?.type == 'None'){
          let row = JSON.stringify(args.rowData);
          let comunidad: Comunidad = JSON.parse(row);

          let titulo = "Comunidad " + comunidad.CODAUTO;
          document.getElementById("titleDataCard")!.innerHTML = titulo;

          let content = "<p>idComunidad: " + comunidad.CODAUTO + "</p><p>Nombre: " + comunidad.AUTONOMIA + "</p><p>Texto Autonomia: " + comunidad.TEXTO_AUTONOMIA;
          document.getElementById("contentDataCard")!.innerHTML = content;

        }

        break;
      }

      case 'colegios': {
        if (args.commandColumn?.type == 'Save'){
          let row = JSON.stringify(args.rowData);
          let colegio: Colegio = JSON.parse(row);
          alert("Guardando colegio con id: " + colegio.idColegio + "\n" + JSON.stringify(colegio));
        }
    
        else if (args.commandColumn?.type == 'Delete'){
          let row = JSON.stringify(args.rowData);
          let colegio: Colegio = JSON.parse(row);
          alert("Elimininando: " + colegio.idColegio);
        }
        
        else if (args.commandColumn?.type == 'None'){
          let row = JSON.stringify(args.rowData);
          let colegio: Colegio = JSON.parse(row);

          let titulo = "Colegio " + colegio.idColegio;
          document.getElementById("titleDataCard")!.innerHTML = titulo;
          let content = "<p>idColegio: " + colegio.idColegio + "</p><p>idMunicipio: " + colegio.idMunicipio + "</p><p>Localidad: " + colegio.Localidad + "</p><p>idProvincia: " + colegio.idProvincia +"</p><p>Provincia: " + colegio.Provincia + "</p><p>Denominacion generica: " + colegio.Denominación_genérica + "</p><p>Denominacion especifica: " + colegio.Denominación_específica + "</p><p>Naturaleza: " + colegio.Naturaleza + "</p><p>Domicilio: " + colegio.Domicilio + "</p><p>Codigo Postal: " + colegio.C_Postal + "</p><p>Telefono: " + colegio.Teléfono;
          document.getElementById("contentDataCard")!.innerHTML = content;
          
          

        }
        break;
      }

      case 'hospitales': {
        if (args.commandColumn?.type == 'Save'){
          let row = JSON.stringify(args.rowData);
          let hospital: Hospital = JSON.parse(row);
          alert("Guardando hospital con id: " + hospital.CODCNH + "\n" + JSON.stringify(hospital));
        }
    
        else if (args.commandColumn?.type == 'Delete'){
          let row = JSON.stringify(args.rowData);
          let hospital: Hospital = JSON.parse(row);
          alert("Elimininando: " + hospital.CODCNH);
        }
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
      case 'hospital': {
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
          this.gridObjUsuarios.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
          this.gridObjUsuarios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }
      
      case 'municipios': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjMunicipios.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
          this.gridObjMunicipios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'provincias': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjProvincias.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
          this.gridObjProvincias.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'comunidades': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjComunidades.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
          this.gridObjComunidades.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'colegios': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjColegios.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
          this.gridObjColegios.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }

      case 'hospitales': {
        (async () => { 
          //Delay 0.5s
          await this.delay(500);
  
          // Do something after
          this.gridObjHospitales.addEventListener("commandClick", (e:CommandClickEventArgs) => this.commandClick(e));
          this.gridObjHospitales.addEventListener("toolbarClick", (e:ClickEventArgs) => this.toolbarClick(e));
        })();
        break;
      }
      
    }
  }

}
