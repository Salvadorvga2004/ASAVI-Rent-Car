import { Component } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Clientes, Usuarios } from '../../modelos/usuarios';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Clientes[]=[];
  cliente: Clientes | any = {};

  modoEdicionCliente: boolean = false;
  filtro: string = '';


    
  constructor(private usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.cargarClientes();
    
    
  }

  cargarClientes() {
    this.usuarioService.getClientes().subscribe(
      clientes => {
        if (this.filtro.trim() !== '') {
          clientes = clientes.filter(cliente => 
            cliente.Nombre && cliente.Nombre.toLowerCase().includes(this.filtro.toLowerCase())
          );
        }

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
}
