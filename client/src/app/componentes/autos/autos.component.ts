import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../service/autos.service';
import { Autos } from '../../modelos/auto';
import { Modelos } from '../../modelos/modelos';
import { ModelosService } from '../../service/modelos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos: Autos[] = [];
  auto: Autos | any = {};
  modelos: Modelos[] = [];
  modelo: Modelos | any = {};
  modoEdicion: boolean = false;
  modoEdicionAuto: boolean = false;
  showFormAndTable: boolean = false; // Variable para controlar la visibilidad del formulario y la tabla
  showModelos: boolean = false;
  // En tu componente.ts
showButton: boolean = true;

filtroNumSerie: string = '';

  constructor(private autoservice: AutosService, private modelosService: ModelosService) {}

  ngOnInit(): void {
    this.cargarAutos();
    this.cargarModelos();
  }


  



  cargarAutos() {
    this.autoservice.getAutos().subscribe(
      autos => {
        if (this.filtroNumSerie.trim() !== '') {
          autos = autos.filter(auto => 
            auto.NumSerie && auto.NumSerie.toLowerCase().includes(this.filtroNumSerie.toLowerCase())
          );
        }
        this.autos = autos;
      },
      error => {
        console.error('Error al cargar autos:', error);
      }
    );
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

  addAutos() {
    if (this.modoEdicionAuto) {
      this.autoservice.updateAuto(this.auto).subscribe(() => {
        this.resetAutoForm();
        this.cargarAutos();
      });
    } else {
      this.autoservice.addAutos(this.auto).subscribe(() => {
        this.resetAutoForm();
        this.cargarAutos();
      });
    }
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


  deleteAuto(_id?: String) {
    const conf = confirm('Estás seguro de eliminar este auto?');
    if (conf) {
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

  editarAuto(auto: Autos) {
    this.modoEdicionAuto = true;
    this.auto = { ...auto };
  }

  editarModelo(modelo: Modelos) {
    this.modoEdicion = true;
    this.modelo = { ...modelo };
  }

  resetAutoForm() {
    this.auto = {};
    this.modoEdicionAuto = false;
  }

  resetForm() {
    this.modelo = {};
    this.modoEdicion = false;
  }

  verAutos() {
    this.showFormAndTable = !this.showFormAndTable;
  }

  verModelos() {
    this.showModelos = !this.showModelos;
  }
  ocultarBoton() {
    this.showButton = false;
 }
 mostrarBoton() {
  this.showButton = true;
 }

}
