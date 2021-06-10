import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Hospital } from 'src/app/modelo/hospital';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public hospital: Hospital;

  constructor(private rutaActiva: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe((params: Params) => {
        let id = params.id;
        this.dataService.sendGetRequest(environment.getHospitales + id).subscribe((data: any) => {
          this.hospital = data;
          console.log(JSON.stringify(this.hospital));
        })
      }
    );
    
  }

}
