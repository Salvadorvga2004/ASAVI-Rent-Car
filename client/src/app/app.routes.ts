import { Routes } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { PantalladosComponent } from './pantallados/pantallados.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { DestinoComponent } from './destino/destino.component';


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
    {
        path:'Pantalla-dos',
        component: PantalladosComponent
    },
    {
        path:'promociones',
        component:PromocionesComponent
    },
    {
        path: 'destino',
        component:DestinoComponent
    }


];
