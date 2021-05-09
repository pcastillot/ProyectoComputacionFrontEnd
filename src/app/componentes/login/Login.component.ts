import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/componentes/registro/modelo/usuarios';
import { environment } from 'src/environments/environment'

@Component({
    selector:'app-login',
    templateUrl:'./Login.component.html',
    styleUrls:['./Login.component.css'],
})
export class LoginComponent{
    reactForm: FormGroup;
    usuario:Usuario = new Usuario();

    constructor(private dataService: DataService, private router: Router) {
        this.reactForm = new FormGroup({
            'email_check': new FormControl('', [FormValidators.email]),
            'password': new FormControl('', [FormValidators.required]),
        });
    }

    



    ngOnInit(): void {
        let formId: HTMLElement = <HTMLElement>document.getElementById('formId')!;
        if (formId != null) {
            formId.addEventListener(
                'submit',
                (e: Event) => {
                    e.preventDefault();
                    if (this.reactForm.valid) {
                        this.iniciarSesion(this.usuario.correo, this.usuario.contrasena);
                        this.reactForm.reset();
                    } else {
                        // validating whole form ---> agrege el if
                        Object.keys(this.reactForm.controls).forEach(field => {
                            const control = this.reactForm.get(field);
                            if (control != null) {
                                control.markAsTouched({ onlySelf: true });
                            }
                        });
                    }
                });
        } 
    }

    redirectRegistro = () =>{
        this.router.navigateByUrl('registro');
    };

    get email_check() { return this.reactForm.get('email_check'); }
    get password() { return this.reactForm.get('password'); }

   
    public iniciarSesion(correo:string, contrasena:string):void {
        //llamar a la api y comprobar usuario valido
        //event.preventDefault()
        var existe = 0;
        var passOK = 0;
        var isAdmin = 0;

        console.log("Correo: " + correo + "\nPass: " +
         contrasena);

        //Comprobar si existe el correo
        this.dataService.sendGetRequest(environment.existeUsuario + correo).subscribe((data: any)=>{
            existe = data;
            console.log("Existe: " + existe);
            //Si existe comprobamos contrasena
            if(existe==1){
                this.dataService.sendGetRequest(environment.checkPassword + correo + "/" + contrasena).subscribe((data: any)=>{
                    passOK = data;
                    console.log("passOK: " + passOK);

                    //Si la contrasena es correcta comprueba si es administrador
                if(passOK==1){
                    this.dataService.sendGetRequest(environment.isAdmin + correo).subscribe((data: any)=>{
                        isAdmin = data;
                        console.log("isAdmin: " + isAdmin);

                        if(isAdmin==1){
                            console.log("Iniciaste sesión como Administrador")
                            alert("Iniciaste sesión como Administrador:\nCorreo: " + correo)
                        }
    
                        else{
                            console.log("Iniciaste sesión como Usuario")
                            alert("Iniciaste sesión como Usuario:\nCorreo: " + correo)
                        }
                    });

                    
                }

                else{
                    console.log("Correo y/o contraseña incorrecta")
                    alert("Credenciales incorrectas")
                }
                });
                
            }

            else{
                console.log("Correo y/o contraseña incorrecta")
                alert("Credenciales incorrectas")
            }
                
            });
        
        
        

    }

    
}