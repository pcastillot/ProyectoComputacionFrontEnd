import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/Login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomepageResolver } from './resolvers/homepage.resolver';
import { InicioComponent } from './componentes/Inicio/inicio.component';
import { pVentanaComponent } from './componentes/PrimeraVentana/pVentana.component';
import { PanelUsuarioComponent } from './componentes/panel-usuario/panel-usuario.component'
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
  { path: 'homepage', component:LoginComponent, resolve:{'itemList': HomepageResolver}},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'pVentana', component: pVentanaComponent},
  { path: 'panelUsuario', component: PanelUsuarioComponent},
  { path: 'cambiarContrasena', component: CambiarContrasenaComponent},
  {
    path:'',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
