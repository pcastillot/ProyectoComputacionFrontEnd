import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Colegio } from 'src/app/modelo/colegio';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.css']
})
export class ColegiosComponent implements OnInit {

  public colegio: Colegio;

  constructor(private rutaActiva: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
      let id = params.id;
      this.dataService.sendGetRequest(environment.getColegios + id).subscribe((data: any) => {
        this.colegio = data;
      })
    }
  );
  }

}
