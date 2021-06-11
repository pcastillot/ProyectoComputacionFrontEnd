import { viewClassName } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { DataService } from 'src/app/data.service';
import { Colegio } from 'src/app/modelo/colegio';
import { Hospital } from 'src/app/modelo/hospital';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, AfterViewInit {
  @ViewChild('listviewInstance')
  public listView: ListViewComponent;

  constructor(private router: Router, private rutaActiva: ActivatedRoute, private dataService: DataService) { }
  
  public dataSource: any[];

  public headerTitle: string = "Resultados de su búsqueda";
  public cssClass: string = 'e-list-template';

  ngOnInit(): void {
    this.dataSource = [];
    this.rutaActiva.params.subscribe((params: Params) => {
      let municipio = params.municipio;
      let colegios = params.colegios;
      let hospitales = params.hospitales;

      if(colegios==="1" && hospitales === "1"){
        this.dataService.sendGetRequest(environment.getColegiosFromMunicipio + municipio).subscribe((data: any) => {
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

          this.dataService.sendGetRequest(environment.getHospitalesFromMunicipio + municipio).subscribe((data: any) => {
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
          });


          
        });

      }

      else if(colegios==="1"){
        this.dataService.sendGetRequest(environment.getColegiosFromMunicipio + municipio).subscribe((data: any) => {
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
        });
      }

      else if(hospitales==="1"){
        this.dataService.sendGetRequest(environment.getHospitalesFromMunicipio + municipio).subscribe((data: any) => {
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
        });
      }
    });
  }


  ngAfterViewInit(): void {
    if(this.dataSource.length === 0){
      this.listView.headerTitle = "No hay resultados para su búsqueda";
    }
  }


  public busqueda(event: any){
    event.preventDefault();

    alert("Buscando...");
  }

  public abrirItem(args: MouseEvent, tipo: string, id: string){
    if(tipo == "hospital")
      this.router.navigateByUrl("hospitales/" + id);
    else if(tipo =="colegio")
      this.router.navigateByUrl("colegios/" + id);
  }

}
