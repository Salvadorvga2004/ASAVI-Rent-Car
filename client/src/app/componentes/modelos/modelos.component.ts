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

  Modelo!: string;
  Tipo!: string;
  Marca!: string;
  Transmision!: string;
  NumPasajeros!: number;
  NumMaletas!: number;
  AireAcondicionado!: string;
  Radio!: string;
  PagoPorDia!: number;
  UrlImagen!: string;
  CantidadAutos!: number;
  ClaveReserva!: string;

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
    const conf = confirm('Estas seguro de eliminar este modelo de auto?')
    if (conf){
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
        console.error("El ID del modelo es inexistente.");
      }
    }

    return ;
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