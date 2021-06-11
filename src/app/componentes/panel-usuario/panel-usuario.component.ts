import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DataService } from 'src/app/data.service';
import { Municipio } from 'src/app/modelo/municipio';
import { Usuario } from 'src/app/modelo/usuarios';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-panel-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {

  @ViewChild('municipios')
  public cbMunicipios: DropDownListComponent;
  reactForm: FormGroup;
  public usuario: Usuario;

  constructor(private dataService: DataService, private router: Router) {
    
  }
  municipios: Municipio[] =[];

  ngOnInit(): void {
    let idUsuario = localStorage.getItem("idSession");
    this.dataService.sendGetRequest(environment.getUsuarios + idUsuario).subscribe((data: any) => {
      this.usuario = data;
      this.reactForm = new FormGroup({
        'check': new FormControl(this.usuario.nombre, [FormValidators.required]),
        'email_check': new FormControl(this.usuario.correo, [FormValidators.email]),
        'municipios': new FormControl('', [FormValidators.required]),
        'apellidos': new FormControl(this.usuario.apellido, [FormValidators.required]),
      });
    });
    this.dataService.sendGetRequest(environment.getMunicipios).subscribe((data: any)=>{
      this.municipios = data;
    });

    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId')!.addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {

          //Funcion a ejecutar cuando el usuario haga click en el boton submit
          alert('Ejecutando cambios');
          this.guardarCambios();
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

  public guardarCambios(){
    alert("Guardando cambios")
    this.router.navigateByUrl('inicio')
  }

  public localFields: Object = { text: 'MUNICIPIO', value: 'CODMU' };
  public localWaterMark: string = 'Selecciona un municipio';

  public height = '250px';

  get check() { return this.reactForm.get('check'); }
  get email_check() { return this.reactForm.get('email_check'); }
  get password() { return this.reactForm.get('password'); }
  get password_repeat() { return this.reactForm.get('password_repeat'); }
  get apellidos() { return this.reactForm.get('apellidos'); }
  get municipiosForm() { return this.reactForm.get('municipiosForm'); }
}
