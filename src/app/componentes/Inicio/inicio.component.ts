import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;
    
  constructor(private router: Router) { }
  
  public confirmHeader: string = 'Inicio de sesión necesario';
  public confirmCloseIcon: Boolean = true;
  public target: string = 'body';
  public confirmWidth: string = '400px';
  public animationSettings: Object = { effect: 'None' };  
  public hidden: Boolean = false;

  ngOnInit(): void {
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
