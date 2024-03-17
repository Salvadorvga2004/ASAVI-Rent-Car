import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../service/autos.service';
import { Autos } from '../../modelos/autos';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos: Autos[] = [];

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

  constructor(private autoservice: AutosService) { }

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

  addAutos(event: Event) {
    event.preventDefault();
    const newAuto: Autos = {
      Modelo: this.Modelo,
      Tipo: this.Tipo,
      Marca: this.Marca,
      Transmision: this.Transmision,
      NumPasajeros: this.NumPasajeros,
      NumMaletas: this.NumMaletas,
      AireAcondicionado: this.AireAcondicionado,
      Radio: this.Radio,
      PagoPorDia: this.PagoPorDia,
      UrlImagen: this.UrlImagen,
      CantidadAutos: this.CantidadAutos,
      ClaveReserva: this.ClaveReserva,
    };
  
    this.autoservice.addAutos(newAuto).subscribe(
      auto => {
        this.autos.push(auto);
        this.cargarAutos();
      },
      error => {
        console.error('Error al añadir auto:', error);
      }
    );
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
}  
