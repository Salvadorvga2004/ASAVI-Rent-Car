import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AutosComponent } from './componentes/autos/autos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { EstadosComponent } from './componentes/estados/estados.component';
import { ModelosComponent } from './componentes/modelos/modelos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavigationComponent } from './componentes/navigation/navigation.component';

import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AutosComponent,
    UsuariosComponent,
    EstadosComponent,
    ModelosComponent,
    PantallaPrincipalComponent,
    NosotrosComponent,
    LoginComponent,
    NavigationComponent,
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }