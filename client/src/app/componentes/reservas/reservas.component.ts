import { Component } from '@angular/core';
import { ReservasService } from '../../service/reservas.service';
import { Reservas } from '../../modelos/reservas';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  reservas: Reservas[] = [];
  reserva: Reservas | any = {};
  modoEdicion: boolean = false;

  constructor(private reservaService: ReservasService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservaService.getReservas().subscribe(
      reservas => {
        this.reservas = this.reservas;
      },
      error => {
        console.error('Error al cargar reservas:', error);
      }
    );
  }

  addReservas() {
    // Verificar si algún campo está vacío
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
}
