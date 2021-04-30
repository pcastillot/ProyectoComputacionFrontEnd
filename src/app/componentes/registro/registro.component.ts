import { Component, OnInit, ViewChild} from '@angular/core';
import { Municipio } from './modelo/municipio';
import { DataService } from '../../data.service';
import {Usuario} from 'src/app/componentes/registro/modelo/usuarios';
import { FormValidators } from "@syncfusion/ej2-angular-inputs";
import { Router } from '@angular/router';
import {
    FormControl,
    FormGroup,
    Validators,
    FormsModule,
    AbstractControl
  } from "@angular/forms";

@Component({
    selector:'app-registro',
    templateUrl:'./registro.component.html',
    styleUrls:['./registro.component.css'],
})
export class RegistroComponent implements OnInit{

    reactForm: FormGroup;

    constructor(private dataService: DataService, private router: Router) {
        this.reactForm = new FormGroup({
        nombre: new FormControl("", [FormValidators.required]),
        apellido: new FormControl("", [FormValidators.required]),
        email_check: new FormControl("", [FormValidators.email]),
        password: new FormControl("", [FormValidators.required]),
        password_repeat: new FormControl("", [FormValidators.required]),
        municipio: new FormControl("", [FormValidators.required])
        });
    }

    municipios: Municipio[] =[];

    //ON INIT
    ngOnInit(): void {
        this.dataService.sendGetRequest('Municipios').subscribe((data: any)=>{
            this.municipios = data;
        });

        let formId: HTMLElement = <HTMLElement>document.getElementById("formId");
        document.getElementById("formId")!.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
            alert("Customer details added!");
            this.reactForm.reset();
        } else {
            // validating whole form
            Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control!.markAsTouched({ onlySelf: true });
            });
        }
        });
    }

    public localFields: Object = { text: 'MUNICIPIO', value: 'CODMU' };
    public localWaterMark: string = 'Selecciona un municipio';

    // set the height of the popup element.
    public height: string = '250px';

    
    usuario = new Usuario();

    //FUNCION CREAR USUARIO
    public crearUsuario(event:any, municipio:any){
        event.preventDefault()
            this.usuario.idMunicipio = municipio;
            this.dataService.addUser(this.usuario).subscribe((data: any)=>{   
                this.router.navigateByUrl('login')
            });    
    }



    //GETTERS
    get nombre() {
        return this.reactForm.get("nombre");
    }
    get apellido() {
        return this.reactForm.get("apellido");
    }

    get email_check() {
        return this.reactForm.get("email_check");
    }
    get password() {
        return this.reactForm.get("password");
    }
    get password_repeat() {
        return this.reactForm.get("password_repeat");
    }
    get municipio() {
        return this.reactForm.get("municipio");
    }
}