import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../service/autos.service';
import { Autos } from '../../modelos/auto';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos: Autos[] = [];
  auto: Autos | any = {};
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

  constructor(private autoservice: AutosService) {}
              

  ngOnInit(): void {
    this.cargarAutos();
  }

  cargarAutos() {
    this.autoservice.getAutos().subscribe(
      autos => {
        this.autos = autos;
      },
      error => {
        console.error('Error al cargar autos:', error);
      }
    );
  }

  addAutos() {
    if (this.modoEdicion) {

      this.autoservice.updateAuto(this.auto).subscribe(() => {
        this.resetForm();
        this.cargarAutos();
      });
    } else {
      this.autoservice.addAutos(this.auto).subscribe(() => {
        this.resetForm();
        this.cargarAutos();
      });
    }
  }



  deleteAuto(_id?: String) {
    const conf = confirm('Estas seguro de eliminar este auto?')
    if (conf){
      if (_id) {
        this.autoservice.deleteAuto(_id).subscribe(
          () => {
            this.autos = this.autos.filter(auto => auto._id !== _id);
          },
          error => {
            console.error('Error al eliminar auto:', error);
          }
        );
      } else {
        console.error("El ID del auto es inexistente.");
      }
    }

    return ;
  }

  editarAuto(auto: Autos) {
    this.modoEdicion = true;
    this.auto = { ...auto };
  }

  resetForm() {
    this.auto = {};
    this.modoEdicion = false;
  }


}  