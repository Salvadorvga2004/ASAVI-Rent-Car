import { Component, OnInit } from '@angular/core';
import { ModelosService } from '../../service/modelos.service';
import { Modelos } from '../../modelos/modelos';
import { TipoAutos } from '../../modelos/tipoAuto';
import { TipoAutoService } from '../../service/tipo-auto.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  modelos: Modelos[] = [];
  modelo: Modelos | any = {};
  modoEdicion: boolean = false;
  filtro: string = '';

  tipoAutos: TipoAutos[]=[];
  tipoAuto: TipoAutos | any = {};

  constructor(private modelosService: ModelosService, private tipoAutoService: TipoAutoService) {}

  ngOnInit(): void {
    this.cargarModelos();
    this.cargarTipoAuto();
  }

  cargarTipoAuto() {
    this.tipoAutoService.getTipoAutos().subscribe(
      tipoAutos => {

        if (this.filtro.trim() !== '') {
          tipoAutos = tipoAutos.filter(tipoAuto => 
            tipoAuto.Tipo && tipoAuto.Tipo.toLowerCase().includes(this.filtro.toLowerCase())
          );
        }

        
        this.tipoAutos = tipoAutos;
      },
      error => {
        console.error('Error al cargar tipo de autos:', error);
      }
    );
}

  cargarModelos() {
    this.modelosService.getModelos().subscribe(
      modelos => {

        if (this.filtro.trim() !== '') {
          modelos = modelos.filter(modelo => 
            modelo.Modelo && modelo.Modelo.toLowerCase().includes(this.filtro.toLowerCase())
          );
        }
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
