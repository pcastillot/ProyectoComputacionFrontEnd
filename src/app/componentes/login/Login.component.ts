import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuarios';
import { environment } from 'src/environments/environment';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
    selector:'app-login',
    templateUrl:'./Login.component.html',
    styleUrls:['./Login.component.css'],
})
export class LoginComponent{

    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;

    reactForm: FormGroup;
    usuario:Usuario = new Usuario();

    public alertHeader: string = 'Credenciales incorrectas';
    public alertContent: string = 'El usuario y/o contraseña son incorrectas';
    public showCloseIcon: Boolean = false;
    public hidden: Boolean = false;
    public alertWidth: string = '400px';
    public target: string = '.control-section';
    public animationSettings: Object = { effect: 'None' };
    public visible: Boolean = true;
    public hide: any;

    //const RSA_PRIVATE_KEY = fs.readFileSync('./jwt/private.key');

    constructor(private dataService: DataService, private router: Router) {
        this.reactForm = new FormGroup({
            'email_check': new FormControl('', [FormValidators.email]),
            'password': new FormControl('', [FormValidators.required]),
        });
    }

    public alertDlgBtnClick = (): void => {
        this.alertDialog.hide();
    }

    
    public alertDlgButtons: ButtonPropsModel[] = [{ 
        click: this.alertDlgBtnClick.bind(this), 
        buttonModel: { content: 'Aceptar', isPrimary: true } 
    }];

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
    redirectInicio = () =>{
        this.router.navigateByUrl('inicio');
    };

    get email_check() { return this.reactForm.get('email_check'); }
    get password() { return this.reactForm.get('password'); }

   
    public iniciarSesion(correo:string, contrasena:string):void {
        //llamar a la api y comprobar usuario valido
        //event.preventDefault()
        var existe = 0;
        var passOK = 0;
        var isAdmin = 0;

        //Comprobar si existe el correo
        this.dataService.sendGetRequest(environment.existeUsuario + correo).subscribe((data: any)=>{
            existe = data;
            //Si existe comprobamos contrasena
            if(existe==1){
                this.dataService.sendGetRequest(environment.checkPassword + correo + "/" + contrasena).subscribe((data: any)=>{
                    passOK = data;

                    //Si la contrasena es correcta comprueba si es administrador
                if(passOK==1){
                    this.dataService.sendGetRequest(environment.isAdmin + correo).subscribe((data: any)=>{
                        isAdmin = data;
                        this.dataService.sendGetRequest(environment.getIdFromCorreo + correo).subscribe((data: any)=>{
                            let idUsuario = data.idUsuario;
                            /*
                            const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                                algorithm: 'RS256',
                                expiresIn: 120,
                                subject: "idSession"
                            }
                            */
                            localStorage.setItem('idSession', idUsuario);

                            if(isAdmin==1){
                                console.log("Iniciaste sesión como Administrador")
                               
                            }
        
                            else{
                                console.log("Iniciaste sesión como Usuario")
                            }
    
                            this.redirectInicio();
                        
                        });
                        
                    });
                }

                else{
                    this.alertDialog.show();
                }
                });
                
            }

            else{
                this.alertDialog.show();
            }
                
            });
        
    }

}