import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {
  
  imagenes: NodeListOf<HTMLElement>; // Declarar sin inicializar

  indiceImagenActual = 0;

  constructor() {
    this.imagenes = {} as NodeListOf<HTMLElement>; // Inicializar en el constructor
  }

  ngOnInit(): void {
    this.imagenes = document.querySelectorAll('.imagen-principal');
    this.mostrarSiguienteImagen();
    setInterval(() => this.mostrarSiguienteImagen(), 5000);
  }

  mostrarSiguienteImagen(): void {
    if (this.imagenes.length > 0) {
      this.imagenes[this.indiceImagenActual].classList.remove('mostrar'); // Quita la clase 'mostrar' de la imagen actual
      this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenes.length;
      this.imagenes[this.indiceImagenActual].classList.add('mostrar'); // Agrega la clase 'mostrar' a la siguiente imagen
    }
  }

}
