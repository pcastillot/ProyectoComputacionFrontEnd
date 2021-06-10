import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DataService } from 'src/app/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;
    
  constructor(private router: Router, private dataService: DataService) { 
}
  
  public confirmHeader: string = 'Inicio de sesión necesario';
  public confirmCloseIcon: Boolean = true;
  public target: string = 'body';
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

  public redirect(ruta: string){
    if(localStorage.getItem("idSession")){
      this.router.navigateByUrl(ruta);
    }
    else{
      this.confirmDialog.show();
    }
    
  }

  public redirectLogin = () => {
    this.router.navigateByUrl("login");
  }

  public redirectRegistro = () => {
    this.router.navigateByUrl("registro");
  }

  public confirmDlgBtnClick = (): void => {
    this.confirmDialog.hide();
  }

  public confirmDlgButtons: ButtonPropsModel[] = [
    { 
      click: this.redirectLogin.bind(this), 
      buttonModel: { content: 'Iniciar Sesión', isPrimary: true } 
    }, 

    { 
      click: this.redirectRegistro.bind(this), 
      buttonModel: { content: 'Registro' } 
    }
  ];

  public confirmBtnClick = (): void => {
    this.confirmDialog.show();
  }

}
