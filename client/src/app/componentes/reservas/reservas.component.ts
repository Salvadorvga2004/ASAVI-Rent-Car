import { Component } from '@angular/core';
import { ReservasService } from '../../service/reservas.service';
import { EstadosService } from '../../service/estados.service';
import { ModelosService } from '../../service/modelos.service';

import { Reservas } from '../../modelos/reservas';
import { Sucursales } from '../../modelos/estados';
import { Modelos } from '../../modelos/modelos';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  reservas: Reservas[] = [];
  reserva: Reservas | any = {};
  sucursales: Sucursales[] = [];
  sucursal: Sucursales | any = {}; 
  modelos: Modelos[] = [];
  modelo: Modelos | any = {};

  modoEdicion: boolean = false;

  sucursalesDisponibles: string[] = [];
  modelosDisponibles: string[] = [];

  constructor(private reservaService: ReservasService, 
              private estadosService: EstadosService,
              private modelosService: ModelosService) {}

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarSucursales();
    this.cargarModelos();
  }

  //Estados y sucursales
  cargarSucursales() {
    this.estadosService.getSucursales().subscribe(
      sucursales => {
        this.sucursales = sucursales;
        this.sucursalesDisponibles = sucursales.flatMap(sucursal => sucursal.Sucursales.map(subSucursal => subSucursal.NombreSucursal));
      },
      error => {
        console.error('Error al cargar sucursales:', error);
      }
    );
  }

  //Modelos
  cargarModelos() {
    this.modelosService.getModelos().subscribe(
      modelos => {
        this.modelos = modelos;
        this.modelosDisponibles = modelos
          .filter(modelo => modelo.Modelo !== undefined)
          .flatMap(modelo => modelo.Modelo as string);
      },
      error => {
        console.error('Error al cargar autos:', error);
      }
    );
  }

  //Reservas
  cargarReservas() {
    this.reservaService.getReservas().subscribe(
      reservas => {
        this.reservas = reservas;
      },
      error => {
        console.error('Error al cargar reservas:', error);
      }
    );
  }

  addReservas() {
    this.reserva.ClaveReserva = this.generarClaveReserva();
    
    if (
      !this.reserva.ClaveReserva ||
      !this.reserva.NumSerie ||
      !this.reserva.ClaveExtra ||
      !this.reserva.ModeloAuto ||
      !this.reserva.FechaEntrega ||
      !this.reserva.HoraEntrega ||
      !this.reserva.SucursalEntrega ||
      !this.reserva.FechaRegreso ||
      !this.reserva.HoraRegreso ||
      !this.reserva.SucursalRegreso ||
      !this.reserva.Estatus ||
      !this.reserva.Total ||
      !this.reserva.Correo
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    if (this.modoEdicion) {
      this.reservaService.updateReserva(this.reserva).subscribe(() => {
        this.resetForm();
        this.cargarReservas();
      });
    } else {
      this.reservaService.addReservas(this.reserva).subscribe(() => {
        this.resetForm();
        this.cargarReservas();
      });
    }
  }

  deleteReserva(_id?: String) {
    const conf = confirm('Estás seguro de eliminar esta reserva?');
    if (conf) {
      if (_id) {
        this.reservaService.deleteReserva(_id).subscribe(
          () => {
            this.reservas = this.reservas.filter(reserva => reserva._id !== _id);
          },
          error => {
            console.error('Error al eliminar reserva:', error);
          }
        );
      } else {
        console.error('El ID de la reserva es inexistente.');
      }
    }
  }

  editarreserva(reserva: Reservas) {
    this.modoEdicion = true;
    this.reserva = { ...reserva };
  }

  resetForm() {
    this.reserva = {};
    this.modoEdicion = false;
  }

  generarClaveReserva(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let clave = '';
    for (let i = 0; i < 10; i++) {
      clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return clave;
  }
}
