import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, config: NgbDropdownConfig, private dataService: DataService) { 
      config.placement = "bottom-right";
      config.autoClose = true;
  }
    
  idUsuario: any;
  nombreUsuario: string;
  isAdmin: boolean;

  ngOnInit(): void {

    this.idUsuario = null;

    if(localStorage.getItem("idSession")){
      this.idUsuario = localStorage.getItem("idSession");

      this.dataService.sendGetRequest(environment.getUsuarios + this.idUsuario).subscribe((data: any)=>{
        this.nombreUsuario = data.nombre + " " + data.apellido;
        let rol = data.rol;
        rol == 0 ? this.isAdmin = false : this.isAdmin = true;
      })


    }

  }

  redirectRegistro = () =>{
    this.router.navigateByUrl('registro');
  };

  redirectLogin = () =>{
    this.router.navigateByUrl('login');
  };

  redirectInicio = () =>{
    this.router.navigateByUrl('inicio');
  };

  cerrarSesion = () =>{
    localStorage.removeItem("idSession");
    this.router.navigateByUrl("login");
  }

}
