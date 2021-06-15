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
import { TurismoComponent } from './componentes/turismo/turismo.component';
import { HospitalesComponent } from './componentes/hospitales/hospitales.component';
import { AboutUsComponent } from './componentes/about-us/about-us.component';
import { VivirComponent } from './componentes/vivir/vivir.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component'
import { ColegiosComponent } from './componentes/colegios/colegios.component';
import { PanelAdminComponent } from './componentes/panel-admin/panel-admin.component'
import { AccessGuardService } from './access-guard.service';
import { PanelAdminCopyComponent } from './componentes/panel-admin-copy/panel-admin.component';


const routes: Routes = [
  { path: 'homepage', component:LoginComponent, resolve:{'itemList': HomepageResolver}},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'pVentana', component: pVentanaComponent},
  { path: 'panelUsuario', component: PanelUsuarioComponent},
  { path: 'cambiarContrasena', component: CambiarContrasenaComponent},
  { path: 'turismo', component: TurismoComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ]},
  { path: 'hospitales', component: HospitalesComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ]},
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'vivir', component: VivirComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ]},
  { path: 'busqueda', component: BusquedaComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ]},
  { path: 'colegios', component: ColegiosComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ]},
  { path: 'panelAdmin', component: PanelAdminComponent, data: { requiresAdmin: true }, canActivate: [AccessGuardService ]},
  { path: 'panelAdmin_old', component: PanelAdminCopyComponent, data: { requiresAdmin: true }, canActivate: [AccessGuardService ]},
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
