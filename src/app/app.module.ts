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
import { NavbarModule, WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
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
    IconsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
