import { Component, OnInit } from '@angular/core';
import { ExtrasService } from '../../service/extras.service';
import { Extras } from '../../modelos/extras';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {
  extras: Extras[] = [];
  extra: Extras | any = {};
  modoEdicion: boolean = false;

  constructor(private extrasService: ExtrasService) {}

  ngOnInit(): void {
    this.cargarExtras();
  }

  cargarExtras() {
    this.extrasService.getExtras().subscribe(
      extras => {
        this.extras = extras;
      },
      error => {
        console.error('Error al cargar extras:', error);
      }
    );
  }

  addExtra() {
    if (
      !this.extra.ClaveExtra ||
      !this.extra.NomArticulo ||
      !this.extra.Descripcion ||
      !this.extra.Precio ||
      !this.extra.NumDias ||
      !this.extra.Total ||
      !this.extra.ClaveReserva
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.modoEdicion) {
      this.extrasService.updateExtra(this.extra).subscribe(() => {
        this.resetForm();
        this.cargarExtras();
      });
    } else {
      this.extrasService.addExtra(this.extra).subscribe(() => {
        this.resetForm();
        this.cargarExtras();
      });
    }
  }

  deleteExtra(_id?: string) {
    const conf = confirm('Estás seguro de eliminar este extra?');
    if (conf) {
      if (_id) {
        this.extrasService.deleteExtra(_id).subscribe(
          () => {
            this.extras = this.extras.filter(extra => extra._id !== _id);
          },
          error => {
            console.error('Error al eliminar extra:', error);
          }
        );
      } else {
        console.error('El ID del extra es inexistente.');
      }
    }
  }

  editarExtra(extra: Extras) {
    this.modoEdicion = true;
    this.extra = { ...extra };
  }

  resetForm() {
    this.extra = {};
    this.modoEdicion = false;
  }
}
