import { Component, OnInit } from '@angular/core';
import { Modelos } from '../../modelos/modelos';
import { ModelosService } from '../../service/modelos.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {
  modelos:Modelos[ ]=[ ];

  constructor(private modeloService: ModelosService){

  }
  ngOnInit(): void {
    this.cargarModelos();
  }
  
  cargarModelos() {
    this.modeloService.getModelos().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        console.error('Error al cargar autos:', error);
      }
    );
  }


}

