import { Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
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
];
