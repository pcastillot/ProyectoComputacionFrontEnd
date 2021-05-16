import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

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
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';


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
    CambiarContrasenaComponent
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

  ],
  providers: [SplashScreenStateService, HomepageResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
