import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuarios } from '../../modelos/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarios: Usuarios[]= [];
  usuario: Usuarios | any = {}; 
  resultadoValidacion: any;
  errorMensaje: string = '';

  constructor (private usuariosService:UsuariosService, private router:Router){this.errorMensaje = '';}

  getIngresar() {
    if (this.usuario.Correo && this.usuario.Contrasena) {
      this.usuariosService.getUsuarios(this.usuario.Correo,this.usuario.Contrasena).subscribe(
          (resultado) => {
            this.resultadoValidacion = resultado;
  
            if (resultado) {
              if (this.resultadoValidacion.ClaveCliente === 1) {
                this.router.navigate(['/inicio']);
              } else if (this.resultadoValidacion.ClaveCliente === 2) {
                this.router.navigate(['/administracion']);
              } else {
                this.errorMensaje = 'Valor de ClaveCliente no reconocido.';
              }
            } else {
              this.errorMensaje = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
            }
          },
          (error) => {
            console.error('Error al validar credenciales', error);
            this.errorMensaje = 'Error al validar la contraseña o correo electrónico. Por favor, inténtalo de nuevo.';
          }
        );
    } else {
      this.errorMensaje = 'Por favor, ingresa el correo electrónico y la contraseña.';
    }
  }
}
