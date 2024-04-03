import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Clientes, Usuarios } from '../../modelos/usuarios';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  clientes: Clientes[]=[];
  cliente: Clientes | any = {};

  usuarios: Usuarios[]=[];
  usuario: Usuarios | any = {};

  modoEdicion: boolean = false;
  modoEdicionCliente: boolean = false;
  modoEdicionUsuario: boolean = false;

  usuariosDisponibles: string[] = [];

  
  constructor(private usuarioService: UsuariosService){}

  


  ngOnInit(): void {
    this.cargarClientes();
    this.cargarUsuarios();
    
  }
   //Estados
   cargarClientes() {
    this.usuarioService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
        
       
      },
      error => {
        console.error('Error al cargar clientes:', error);
      }
    );
  }

  addClientes() {
    if (this.modoEdicionCliente) {
        this.usuarioService.updatecliente(this.cliente).subscribe(() => {
            this.resetForm();
            this.cargarClientes();
        });
    } else{
      this.usuarioService.addClientes(this.cliente).subscribe(() => {
        this.resetForm();
        this.cargarClientes();
      });
      
       
    }
}

  deleteCliente(_id?: String) {
    const conf = confirm('Estas seguro de eliminar este cliente?')
    if (conf){
      if (_id) {
        this.usuarioService.deletecliente(_id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cliente => cliente._id !== _id);
            this.resetForm();
          },
          error => {
            console.error('Error al eliminar cliente:', error);
          }
        );
      } else {
        console.error("El ID del cliente es inexistente.");
      }
    }

    return ;
  }

  editarCliente(cliente: Clientes) {

    this.modoEdicionCliente = true;
    this.cliente = { ...cliente };
  }


  resetForm() {
    this.cliente = {};
    this.modoEdicionCliente = false;
   
  }

  //Usuarios
  cargarUsuarios() {
    this.usuarioService.getUsuario().subscribe(
      usuarios => {
        this.usuarios = usuarios;
        
       
      },
      error => {
        console.error('Error al cargar administradores:', error);
      }
    );
  }

  addUsuarios() {
    if (this.modoEdicionUsuario) {
        this.usuarioService.updateusuario(this.usuario).subscribe(() => {
            this.resetFormAdmin();
            this.cargarUsuarios();
        });
    } else{
      const dataUsu = {
        ClaveCliente: this.usuario.ClaveCliente = 2,
        Correo: this.usuario.Correo,
        Contrasena: this.usuario.Contrasena
      };
      this.usuarioService.addUsuarios(dataUsu).subscribe(() => {
        this.resetFormAdmin();
        this.cargarUsuarios();
      });
      
       
    }
}

  deleteUsuarios(_id?: String) {
    const conf = confirm('Estas seguro de eliminar este cliente?')
    if (conf){
      if (_id) {
        this.usuarioService.deleteusuario(_id).subscribe(
          () => {
            this.usuarios = this.usuarios.filter(usuario => usuario._id !== _id);
            this.resetFormAdmin();
          },
          error => {
            console.error('Error al eliminar Administrador:', error);
          }
        );
      } else {
        console.error("El correo del aministrador es inexistente.");
      }
    }

    return ;
  }

  editarUsuarios(usuario: Usuarios) {

    this.modoEdicionUsuario = true;
    this.usuario = { ...usuario };
  }


  resetFormAdmin() {
    this.usuario = {};
    this.modoEdicionUsuario = false;
   
  }


}
