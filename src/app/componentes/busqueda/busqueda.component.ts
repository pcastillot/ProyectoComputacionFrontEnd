import { viewClassName } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { DataService } from 'src/app/data.service';
import { Colegio } from 'src/app/modelo/colegio';
import { Hospital } from 'src/app/modelo/hospital';
import { environment } from 'src/environments/environment';
import { DataManager, Query, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { CheckboxComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, AfterViewInit {
  @ViewChild('listviewInstance')
  public listView: ListViewComponent;

  @ViewChild('sidebar')
  public sidebar: SidebarComponent;
  
  @ViewChild('checkboxColegios')
  public checkColegios: CheckboxComponent;
  
  @ViewChild('checkboxHospitales')
  public checkHospitales: CheckboxComponent;
  
  public closeOnDocumentClick: boolean = false;

  constructor(private router: Router, private rutaActiva: ActivatedRoute, private dataService: DataService) { }
  
  public dataSource: any[];

  public headerTitle: string = "Resultados de su búsqueda";
  public cssClass: string = 'e-list-template';

  public buscarColegios: any;
  public buscarHospitales: any;
  public buscarMunicipio: any;
  public municipio: string;

  ngOnInit(): void {
    this.dataSource = [];
    this.rutaActiva.params.subscribe((params: Params) => {
      this.buscarMunicipio = params.municipio;
      this.buscarColegios = params.colegios;
      this.buscarHospitales = params.hospitales;
      this.dataService.sendGetRequest(environment.getMunicipios + this.buscarMunicipio).subscribe((data: any) => {
        this.municipio = data.MUNICIPIO;
      })
      this.getData();
      
    });
  }

  private getData(): void{
    this.dataSource=[];
    console.log("" + this.buscarColegios + " " + this.buscarHospitales)
    if(this.buscarColegios==="1" && this.buscarHospitales === "1"){
      this.dataService.sendGetRequest(environment.getColegiosFromMunicipio + this.buscarMunicipio).subscribe((data: any) => {
        let colegiosData: Colegio[] = data;
        console.log(colegiosData);
        colegiosData.forEach(colegio => {
          this.dataSource.push({
            "id": colegio.idColegio,
            "titulo": colegio.Denominacion_generica + " " + colegio.Denominacion_especifica,
            "descripcion": colegio.Naturaleza,
            "direccion": colegio.Domicilio,
            "tipo": "colegio"
          });
        });

        this.dataService.sendGetRequest(environment.getHospitalesFromMunicipio + this.buscarMunicipio).subscribe((data: any) => {
          let hospitalesData: Hospital[] = data;
          console.log(hospitalesData);
          hospitalesData.forEach(hospital => {
            console.log(hospital);
            this.dataSource.push({
              "id": hospital.CODCNH,
              "titulo": hospital.Nombre_Centro,
              "descripcion": hospital.Clase_de_Centro + ". " + hospital.Dependencia_Funcional,
              "direccion": hospital.Tipo_Via + ", " + hospital.Nombre_Via + ", " + hospital.Numero_Via,
              "tipo": "hospital"
            });
            
          });
          console.log(this.dataSource);
          this.listView.refresh();
        
          if(this.dataSource.length === 0){
            this.listView.headerTitle = "No hay resultados para su búsqueda en " + this.municipio;
          } else{
            this.listView.headerTitle = "Resultados de su búsqueda en " + this.municipio;
          }
        });


        
      });

    }

    else if(this.buscarColegios==="1"){
      this.dataService.sendGetRequest(environment.getColegiosFromMunicipio + this.buscarMunicipio).subscribe((data: any) => {
        let colegiosData: Colegio[] = data;
        console.log(colegiosData);
        colegiosData.forEach(colegio => {
          this.dataSource.push({
            "id": colegio.idColegio,
            "titulo": colegio.Denominacion_generica + " " + colegio.Denominacion_especifica,
            "descripcion": colegio.Naturaleza,
            "direccion": colegio.Domicilio,
            "tipo": "colegio"
          })
        });

        this.listView.refresh();
        
        if(this.dataSource.length === 0){
          this.listView.headerTitle = "No hay resultados para su búsqueda en " + this.municipio;
        } else{
          this.listView.headerTitle = "Resultados de su búsqueda en " + this.municipio;
        }
      });
    }

    else if(this.buscarHospitales==="1"){
      this.dataService.sendGetRequest(environment.getHospitalesFromMunicipio + this.buscarMunicipio).subscribe((data: any) => {
        let hospitalesData: Hospital[] = data;
        console.log(hospitalesData);
        hospitalesData.forEach(hospital => {
          console.log(hospital);
          this.dataSource.push({
            "id": hospital.CODCNH,
            "titulo": hospital.Nombre_Centro,
            "descripcion": hospital.Clase_de_Centro + ". " + hospital.Dependencia_Funcional,
            "direccion": hospital.Tipo_Via + ", " + hospital.Nombre_Via + ", " + hospital.Numero_Via,
            "tipo": "hospital"
          })
        });

        this.listView.refresh();
        
        if(this.dataSource.length === 0){
          this.listView.headerTitle = "No hay resultados para su búsqueda en " + this.municipio;
        } else{
          this.listView.headerTitle = "Resultados de su búsqueda en " + this.municipio;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.buscarColegios == 1 ? this.checkColegios.checked = true : this.checkColegios.checked = false;
    this.buscarHospitales == 1 ? this.checkHospitales.checked = true : this.checkHospitales.checked = false;
  }

  public aplicarFiltros(colegios: boolean, hospitales: boolean){
    colegios == true ? this.buscarColegios = "1" : this.buscarColegios = "0";
    hospitales == true ? this.buscarHospitales = "1" : this.buscarHospitales = "0";

    this.getData();
    console.log(this.dataSource);
    //this.router.navigate(["busqueda", this.buscarMunicipio, this.buscarColegios, this.buscarHospitales], {skipLocationChange: false});
    this.listView.refresh();
    
  }

  public busqueda(event: any, search: string){
    event.preventDefault();

    const regExp = new RegExp(search, 'i');
    let data = this.dataSource.filter(item => regExp.test(item.titulo) || regExp.test(item.descripcion) || regExp.test(item.direccion));
    this.listView.dataSource = data;
    this.listView.headerTitle = "Resultados de su búsqueda '" + search + "' en " + this.municipio;
  }

  public abrirItem(args: MouseEvent, tipo: string, id: string){
    if(tipo == "hospital")
      this.router.navigateByUrl("hospitales/" + id);
    else if(tipo =="colegio")
      this.router.navigateByUrl("colegios/" + id);
  }

  newTabClick(): void {
    let URL = location.href.replace(location.search,'');
    document.getElementById('newTab')!.setAttribute('href', URL.split('#')[0] + 'sidebar/default');
  }
  positionChange(args: any) {
      this.sidebar.position = args.value == "left" ? "Left" : "Right";
      if(args.value == "right"){
          document.getElementById("hamburger")!.className += " e-rtl";
      }
      if(args.value == "left"){
          document.getElementById("hamburger")!.classList.remove("e-rtl");
      }
  }
  toggleClick() {
      this.sidebar.toggle();
  }
  closeClick() {
      this.sidebar.hide();
  }
  openClick() {
      this.sidebar.show();
  }
  //To hide the sidebar element skelton during the page load by setting the visibity style when the control is created.
  onCreated(e: any): void {
      this.sidebar.element.style.visibility = 'visible';
  }

}
