import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../service/autos.service';
import { Autos } from '../../modelos/autos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos: Autos[] = [];
  autoForm: FormGroup;
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

  constructor(private autoservice: AutosService,
              private fb: FormBuilder) {
                this.autoForm = this.fb.group({
                  _id: [null],
                  Modelo: ['', Validators.required],
                  Tipo: ['', Validators.required],
                  Marca: ['', Validators.required],
                  Transmision: ['', Validators.required],
                  NumPasajeros: [0, Validators.required],
                  NumMaletas: [0, Validators.required],
                  AireAcondicionado: ['', Validators.required],
                  Radio: ['', Validators.required],
                  PagoPorDia: [0, Validators.required],
                  UrlImagen: ['', Validators.required],
                  CantidadAutos: [0, Validators.required],
                  ClaveReserva: ['', Validators.required],
                });
              }
              

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

  updateAuto() {
    if (this.autoForm.valid) {
      this.autoservice.updateAuto(this.autoForm.value).subscribe(
        () => {
          this.cargarAutos();
          this.autoForm.reset();
        },
        error => {
          console.error('Error al actualizar estado:', error);
        }
      );
    }
  }
}  