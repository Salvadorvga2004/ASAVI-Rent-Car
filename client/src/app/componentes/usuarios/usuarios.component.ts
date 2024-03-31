import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../service/usuarios.service';
import { EstadosService } from '../../service/estados.service';

import { Ciudades, Estados } from '../../modelos/estados';
import { Clientes,Usuarios } from '../../modelos/usuarios';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  estados: Estados[] = [];
  estado: Estados | any = {};
  ciudades: Ciudades[] = [];
  ciudad: Ciudades | any = {};
  clientes: Clientes[]= [];
  cliente: Clientes | any = {}; 
  usuarios: Usuarios[]= [];
  usuario: Usuarios | any = {}; 


  ciudadesDisponibles: string[] = [];
  estadosDisponibles: string[] = [];

  constructor(private estadosService: EstadosService, private usuarioService : UsuariosService, private router:Router) {}

  ngOnInit(): void {
    this.cargarEstados();
    this.cargarCiudades();
  }
  //Estados y ciudades
  cargarEstados() {
    this.estadosService.getEstados().subscribe(
      estados => {
        this.estados = estados;
        this.estadosDisponibles = estados.flatMap(estado => estado.Estados.map(subEstado => subEstado.NombreEstado));
      },
      error => {
        console.error('Error al cargar estados:', error);
      }
    );
  }
  cargarCiudades() {
    this.estadosService.getCiudades().subscribe(
      ciudades => {
        this.ciudades = ciudades;
        this.ciudadesDisponibles = ciudades.flatMap(ciudades => ciudades.Ciudades.map(subCiudades => subCiudades.NombreCiudad));

      },
      error => {
        console.error('Error al cargar ciudades:', error);
      }
    );
  }
  
  //Logica de Clientes
  addClientes() {
    const dataCli = {
      Nombre: this.cliente.Nombre, 
      ApPaterno: this.cliente.ApPaterno, 
      ApMaterno: this.cliente.ApMaterno, 
      Telefono: this.cliente.Telefono, 
      Pais: this.cliente.Pais, 
      Estados: this.cliente.Estados, 
      Ciudades: this.cliente.Ciudades, 
      Municipio: this.cliente.Municipio, 
      Calle: this.cliente.Calle, 
      Colonia: this.cliente.Colonia, 
      NumExterior: this.cliente.NumExterior, 
      NumLicencia: this.cliente.NumLicencia, 
      EstadoEmision: this.cliente.EstadoEmision, 
      FechaVencimientoLic: this.cliente.FechaVencimientoLic, 
      FechaEmisionLic: this.cliente.FechaEmisionLic, 
      EstadoEmisionLic: this.cliente.EstadoEmisionLic, 
      UrlLicencia: this.cliente.UrlLicencia, 
      NumIne: this.cliente.NumIne, 
      FechaVencimientoIne: this.cliente.FechaVencimientoIne, 
      UrlIne: this.cliente.UrlIne, 
      Correo: this.cliente.Correo, 
      Contrasena: this.cliente.Contrasena
    };

    const dataUsu = {
      ClaveCliente: this.usuario.ClaveCliente = 1,
      Correo: this.cliente.Correo,
      Contrasena: this.cliente.Contrasena
    };
      
        this.usuarioService.addClientes(dataCli).subscribe(() => {
          this.usuarioService.addUsuarios(dataUsu).subscribe(()=>{
            this.router.navigate(['/login']);
          })
          
        });
    }
}
