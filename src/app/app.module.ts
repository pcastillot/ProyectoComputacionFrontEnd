import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { CommandColumnService, EditService, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/Login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NavbarModule, WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import { InicioComponent } from './componentes/Inicio/inicio.component';
import { SplashScreenStateService } from './services/splash-screen-state.service';
import { SplashComponent } from './componentes/splash/splash.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomepageResolver } from './resolvers/homepage.resolver';
import { pVentanaComponent } from './componentes/PrimeraVentana/pVentana.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelUsuarioComponent } from './componentes/panel-usuario/panel-usuario.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ListMenuPanelComponent } from './componentes/list-menu-panel/list-menu-panel.component';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { TurismoComponent } from './componentes/turismo/turismo.component';
import { HospitalesComponent } from './componentes/hospitales/hospitales.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './componentes/map/map.component';
import { AboutUsComponent } from './componentes/about-us/about-us.component';
import { VivirComponent } from './componentes/vivir/vivir.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { FiltrosComponent } from './componentes/filtros/filtros.component';
import { ResultadosBusquedaComponent } from './componentes/resultados-busqueda/resultados-busqueda.component';
import { ColegiosComponent } from './componentes/colegios/colegios.component';
import { PanelAdminComponent } from './componentes/panel-admin/panel-admin.component';
import { AccessGuardService } from './access-guard.service'
import { ComponenteJaviComponent } from './componentes/componenteJavi/componenteJavi.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    InicioComponent,
    SplashComponent,
    HomepageComponent,
    pVentanaComponent,
    PanelUsuarioComponent,
    ListMenuPanelComponent,
    CambiarContrasenaComponent,
    TurismoComponent,
    MapComponent,
    HospitalesComponent,
    VivirComponent,
    AboutUsComponent,
    BusquedaComponent,
    FiltrosComponent,
    ResultadosBusquedaComponent,
    ColegiosComponent,
    PanelAdminComponent,
    ComponenteJaviComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComboBoxModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    WavesModule, 
    ButtonsModule,
    IconsModule,
    NgbModule,
    ListViewModule,
    ButtonModule,
    DropDownTreeModule,
    GoogleMapsModule,
    DropDownListModule,
    CheckBoxModule,
    SidebarModule,
    GridAllModule,
    DialogModule,
    FormsModule,
  ],
  providers: [SplashScreenStateService, HomepageResolver, EditService, CommandColumnService, AccessGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
