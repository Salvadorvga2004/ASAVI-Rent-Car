import { Component, OnInit } from '@angular/core';
import { ModelosService } from '../../service/modelos.service';
import { Modelos } from '../../modelos/modelos';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  modelos: Modelos[] = [];
  modelo: Modelos | any = {};
  modoEdicion: boolean = false;

  constructor(private modelosService: ModelosService) {}

  ngOnInit(): void {
    this.cargarModelos();
  }

  cargarModelos() {
    this.modelosService.getModelos().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        console.error('Error al cargar autos:', error);
      }
    );
  }

  addModelos() {
    // Verificar si algún campo está vacío
    if (
      !this.modelo.Modelo ||
      !this.modelo.Tipo ||
      !this.modelo.Marca ||
      !this.modelo.Transmision ||
      !this.modelo.NumPasajeros ||
      !this.modelo.NumMaletas ||
      !this.modelo.AireAcondicionado ||
      !this.modelo.Radio ||
      !this.modelo.PagoPorDia ||
      !this.modelo.UrlImagen ||
      !this.modelo.CantidadAutos
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.modoEdicion) {
      this.modelosService.updateModelo(this.modelo).subscribe(() => {
        this.resetForm();
        this.cargarModelos();
      });
    } else {
      this.modelosService.addModelos(this.modelo).subscribe(() => {
        this.resetForm();
        this.cargarModelos();
      });
    }
  }

  deleteModelo(_id?: String) {
    const conf = confirm('Estás seguro de eliminar este modelo de auto?');
    if (conf) {
      if (_id) {
        this.modelosService.deleteModelo(_id).subscribe(
          () => {
            this.modelos = this.modelos.filter(modelo => modelo._id !== _id);
          },
          error => {
            console.error('Error al eliminar modelo:', error);
          }
        );
      } else {
        console.error('El ID del modelo es inexistente.');
      }
    }
  }

  editarModelo(modelo: Modelos) {
    this.modoEdicion = true;
    this.modelo = { ...modelo };
  }

  resetForm() {
    this.modelo = {};
    this.modoEdicion = false;
  }
}
