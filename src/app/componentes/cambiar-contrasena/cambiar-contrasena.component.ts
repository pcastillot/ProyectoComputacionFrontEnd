import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DataService } from 'src/app/data.service';
import { Usuario } from 'src/app/modelo/usuarios';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  reactForm: FormGroup;
  usuario = new Usuario();

  constructor(private dataService: DataService, private router: Router) {
    this.reactForm = new FormGroup({
      'password': new FormControl('', [FormValidators.required]),
      'new_password': new FormControl('', [FormValidators.required]),
      'new_password_repeat': new FormControl('', [FormValidators.required]),
    });
  }

  ngOnInit(): void {

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

  public cambiarContrasena(event:any) {
    event.preventDefault()
    alert("Cambiando contraseña")
  }

  get password() { return this.reactForm.get('password'); }
  get new_password() { return this.reactForm.get('new_password_repeat'); }
  get new_password_repeat() { return this.reactForm.get('new_password_repeat'); }
}
