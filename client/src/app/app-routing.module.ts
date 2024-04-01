import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AutosComponent } from './componentes/autos/autos.component';
import { EstadosComponent } from './componentes/estados/estados.component';
import { ModelosComponent } from './componentes/modelos/modelos.component';
import { LoginComponent } from './componentes/login/login.component';

import { PantallaPrincipalComponent } from './componentes/pantalla-principal/pantalla-principal.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';


const routes: Routes = [
  {
      path: '',
      redirectTo:'/login',
      pathMatch:'full'
  },
  {
      path:'usuarios',
      component: UsuariosComponent
  },
  {
      
      path:'inicio',
      component: InicioComponent
  },
  {
      path:'autos',
      component: AutosComponent
  },
  {
    path:'estados',
    component: EstadosComponent
  },
  {
    path:'modelos',
    component: ModelosComponent
  },
  {

    path:'principal',
    component: PantallaPrincipalComponent
  },
  {
    path:'nosotros', 
    component: NosotrosComponent
  },
  {
    path:'login',
    component: LoginComponent
  }  ,
  {
    path: 'administracion',
    component:AdministracionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }