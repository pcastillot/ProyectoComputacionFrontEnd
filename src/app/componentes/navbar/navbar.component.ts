import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;

  constructor(private router: Router, config: NgbDropdownConfig, private dataService: DataService) { 
      config.placement = "bottom-right";
      config.autoClose = true;
  }

  public confirmHeader: string = '¿Estás seguro?';
  public confirmCloseIcon: Boolean = true;
  public target: string = '.body';
  public confirmWidth: string = '400px';
  public animationSettings: Object = { effect: 'None' };  
  public hidden: Boolean = false;
    
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

  public confirmDlgBtnClick = (): void => {
    this.confirmDialog.hide();
  }

  

  public hideDialog = () => {
    this.confirmDialog.hide();
  }

  public confirmBtnClick = (): void => {
    this.confirmDialog.show();
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

  public confirmDlgButtons: ButtonPropsModel[] = [
    { 
      click: this.cerrarSesion.bind(this), 
      buttonModel: { content: 'Cerrar Sesión', isPrimary: true } 
    }, 

    { 
      click: this.hideDialog.bind(this), 
      buttonModel: { content: 'Cancelar' } 
    }
  ];

}
