import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routes';

import { AppComponent } from './app.component';
import { AutosComponent } from './componentes/autos/autos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AutosComponent,
    UsuariosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
