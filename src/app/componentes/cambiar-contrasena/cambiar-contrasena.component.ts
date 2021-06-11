import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DataService } from 'src/app/data.service';
import { Usuario } from 'src/app/modelo/usuarios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
  
  @ViewChild('alertDialog')
  public alertDialog: DialogComponent;

  reactForm: FormGroup;
  usuario = new Usuario();
  public contrasena: string;
  public nuevaContrasena: string;
  public confNuevaContrasena: string;

  public alertHeader: string = '';
  public alertContent: string = '';
  public showCloseIcon: Boolean = false;
  public hidden: Boolean = false;
  public alertWidth: string = '400px';
  public target: string = 'body';
  public animationSettings: Object = { effect: 'None' };
  public visible: Boolean = true;
  public hide: any;

  constructor(private dataService: DataService, private router: Router) {
    this.reactForm = new FormGroup({
      'password': new FormControl('', [FormValidators.required]),
      'new_password': new FormControl('', [FormValidators.required]),
      'new_password_repeat': new FormControl('', [FormValidators.required]),
    });
  }

  ngOnInit(): void {

    this.dataService.sendGetRequest(environment.getUsuarios + localStorage.getItem("idSession")).subscribe((data: any) => {
      this.usuario = data;
    })

    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId')!.addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {

          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control!.markAsTouched({ onlySelf: true });
          });
        }
      }
    );
    
  }

  public alertDlgButtons: ButtonPropsModel[] = [{ 
    click: this.alertDlgBtnClick.bind(this), 
    buttonModel: { content: 'Aceptar', isPrimary: true } 
  }];

  public alertDlgBtnClick(){
    this.alertDialog.hide();
  }

  public cambiarContrasena(event:any) {
    event.preventDefault()
    if(this.contrasena === this.usuario.contrasena){
      if(this.nuevaContrasena === this.confNuevaContrasena){
        this.usuario.contrasena = this.nuevaContrasena;
        this.dataService.updateUsuario(this.usuario).subscribe((data: any) => {
          console.log(data);
          this.alertHeader = "Contraseña actualizada";
          this.alertContent = "Contraseña actualizada con éxito";
          this.alertDialog.show();
        })
      }
      else{
        this.alertHeader = "Las contraseñas no coinciden";
        this.alertContent = "Debe introducir correctamente la nueva contraseña dos veces";
        this.alertDialog.show();
      }
    }
    else{
      this.alertHeader = "Contraseña incorrecta";
      this.alertContent = "Debe introducir su contraseña actual correctamente";
      this.alertDialog.show();
    }
  }

  get password() { return this.reactForm.get('password'); }
  get new_password() { return this.reactForm.get('new_password_repeat'); }
  get new_password_repeat() { return this.reactForm.get('new_password_repeat'); }
}
