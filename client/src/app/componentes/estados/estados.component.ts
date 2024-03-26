import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EstadosService } from '../../service/estados.service';

import { Estados } from '../../modelos/estados';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'] 
})
export class EstadosComponent implements OnInit {
  estados: Estados[] = [];
  estado: Estados | any = {}; 
  modoEdicion: boolean = false;

  constructor(private estadosService: EstadosService) {}
              
  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados() {
    this.estadosService.getEstados().subscribe(
      estados => {
        this.estados = estados;
      },
      error => {
        console.error('Error al cargar estados:', error);
      }
    );
  }

  addEstados() {
    if (this.modoEdicion) {
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
    this.modoEdicion = true;
    this.estado = { ...estado };
  }

  resetForm() {
    this.estado = {};
    this.modoEdicion = false;
  }
}
