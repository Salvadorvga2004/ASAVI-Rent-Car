import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AutosComponent } from './componentes/autos/autos.component';

const routes: Routes = [
  {
      path: '',
      redirectTo:'/inicio',
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }