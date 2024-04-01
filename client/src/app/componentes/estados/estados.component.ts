import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EstadosService } from '../../service/estados.service';

import { Ciudades, Estados, Sucursales } from '../../modelos/estados';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'] 
})
export class EstadosComponent implements OnInit {
  estados: Estados[] = [];
  estado: Estados | any = {};
  ciudades: Ciudades[] = [];
  ciudad: Ciudades | any = {}; 
  sucursales: Sucursales[] = [];
  sucursal: Sucursales | any = {}; 

  modoEdicionEstado: boolean = false;
  modoEdicionCiudad : boolean = false;
  modoEdicionSucursal : boolean = false;

  ciudadesDisponibles: string[] = [];
  estadosDisponibles: string[] = [];

  filtroEstado: string = '';
  filtroCiudad: string = '';
  filtroSucursal: string = '';

  constructor(private estadosService: EstadosService) {}
              
  ngOnInit(): void {
    this.cargarEstados();
    this.cargarCiudades();
    this.cargarSucursales();
  }

  //Estados
  cargarEstados() {
    this.estadosService.getEstados().subscribe(
        estados => {
            if (this.filtroEstado.trim() !== '') {
                estados = estados.filter(estado => estado.Estados.some(subEstado => subEstado.NombreEstado.toLowerCase().includes(this.filtroEstado.toLowerCase())));
            }
            
            this.estados = estados;
            this.estadosDisponibles = estados.flatMap(estado => estado.Estados.map(subEstado => subEstado.NombreEstado));
        },
        error => {
            console.error('Error al cargar estados:', error);
        }
    );
}

  addEstados() {
    if (this.modoEdicionEstado) {
        this.estadosService.updateEstado(this.estado).subscribe(() => {
            this.resetForm();
            this.cargarEstados();
        });
    } else {
        const data = {
            Pais: this.estado.Pais,
            Estados: [
                {
                    ClaveEstado: this.estado.ClaveEstado,
                    NombreEstado: this.estado.NombreEstado
                }
            ]
        };
        this.estadosService.addEstados(data).subscribe(() => {
            this.resetForm();
            this.cargarEstados();
        });
    }
}

  deleteEstado(_id?: String) {
    const conf = confirm('Estas seguro de eliminar este estado?')
    if (conf){
      if (_id) {
        this.estadosService.deleteEstado(_id).subscribe(
          () => {
            this.estados = this.estados.filter(estado => estado._id !== _id);
            this.resetForm();
          },
          error => {
            console.error('Error al eliminar estado:', error);
          }
        );
      } else {
        console.error("El ID del estado es inexistente.");
      }
    }

    return ;
  }

  editarEstado(estado: Estados) {
    this.modoEdicionEstado = true;
    this.estado = { ...estado };
  }

  resetFormEstado() {
    this.estado = {};
    this.modoEdicionEstado = false;
  }

  resetForm() {
    this.estado = {};
    this.modoEdicionEstado = false;
    this.ciudad = {};
    this.modoEdicionCiudad = false
    this.sucursal = {};
    this.modoEdicionSucursal = false

  }

  //Ciudades
  cargarCiudades() {
    this.estadosService.getCiudades().subscribe(
      ciudades => {
        if (this.filtroCiudad.trim() !== '') {
          ciudades = ciudades.filter(ciudad => ciudad.Ciudades.some(subCiudad => subCiudad.NombreCiudad.toLowerCase().includes(this.filtroCiudad.toLowerCase())) ||
            (ciudad.Estados && ciudad.Estados.toLowerCase().includes(this.filtroCiudad.toLowerCase()))
          );
        }

        this.ciudades = ciudades;
        this.ciudadesDisponibles = ciudades.flatMap(ciudad => ciudad.Ciudades.map(subCiudad => subCiudad.NombreCiudad));
      },
      error => {
        console.error('Error al cargar ciudades:', error);
      }
    );
}



  addCiudades() {
    if (this.modoEdicionCiudad) {
        this.estadosService.updateCiudad(this.ciudad).subscribe(() => {
            this.resetForm();
            this.cargarCiudades();
        });
    } else {
        const data = {
            Pais: this.ciudad.Pais,
            Estados: this.ciudad.Estados,
            Ciudades: [
                {
                    ClaveCiudad: this.ciudad.ClaveCiudad,
                    NombreCiudad: this.ciudad.NombreCiudad
                }
            ]
        };
        this.estadosService.addCiudad(data).subscribe(() => {
            this.resetForm();
            this.cargarCiudades();
        });
    }
}

  deleteCiudad(_id?: String) {
    const conf = confirm('Estas seguro de eliminar esta ciudad?')
    if (conf){
      if (_id) {
        this.estadosService.deleteCiudad(_id).subscribe(
          () => {
            this.ciudades = this.ciudades.filter(ciudad => ciudad._id !== _id);
            this.resetForm();
          },
          error => {
            console.error('Error al eliminar ciudad:', error);
          }
        );
      } else {
        console.error("El ID de la ciudad es inexistente.");
      }
    }

    return ;
  }

  editarCiudad(ciudad: Ciudades) {
    this.modoEdicionCiudad = true;
    this.ciudad = { ...ciudad };
  }
  
  resetFormCiudad() {
    this.ciudad = {};
    this.modoEdicionCiudad = false
  }

  //Sucursales
  cargarSucursales() {
    this.estadosService.getSucursales().subscribe(
      sucursales => {
        if (this.filtroSucursal.trim() !== '') {
          sucursales = sucursales.filter(sucursal => sucursal.Sucursales.some(subSucursal => subSucursal.NombreSucursal.toLowerCase().includes(this.filtroSucursal.toLowerCase())) ||
            (sucursal.Ciudades && sucursal.Ciudades.toLowerCase().includes(this.filtroSucursal.toLowerCase())) ||
            (sucursal.Estados && sucursal.Estados.toLowerCase().includes(this.filtroSucursal.toLowerCase()))
          );
        }
        this.sucursales = sucursales;
      },
      error => {
        console.error('Error al cargar sucursales:', error);
      }
    );
  }


  addSucursales() {
    if (this.modoEdicionSucursal) {
        this.estadosService.updateSucursal(this.sucursal).subscribe(() => {
            this.resetForm();
            this.cargarSucursales();
        });
    } else {
        const data = {
            Pais: this.sucursal.Pais,
            Estados: this.sucursal.Estados,
            Ciudades: this.sucursal.Ciudades,
            Sucursales: [
                {
                    ClaveSucursal: this.sucursal.ClaveSucursal,
                    NombreSucursal: this.sucursal.NombreSucursal,
                    Telefono: this.sucursal.Telefono
                }
            ]
        };
        this.estadosService.addSucursales(data).subscribe(() => {
            this.resetForm();
            this.cargarSucursales();
        });
    }
}

  deleteSucursal(_id?: String) {
    const conf = confirm('Estas seguro de eliminar esta sucursal?')
    if (conf){
      if (_id) {
        this.estadosService.deleteSucursal(_id).subscribe(
          () => {
            this.sucursales = this.sucursales.filter(sucursal => sucursal._id !== _id);
            this.resetForm();
          },
          error => {
            console.error('Error al eliminar sucursal:', error);
          }
        );
      } else {
        console.error("El ID de la sucursal es inexistente.");
      }
    }

    return ;
  }

  editarSucursales(sucursal: Sucursales) {
    this.modoEdicionSucursal = true;
    this.sucursal = { ...sucursal };
  }
  
  resetFormSucursal() {
    this.sucursal = {};
    this.modoEdicionSucursal = false
  }

}
