import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { Estados } from '../modelos/estados';
import { Ciudades } from '../modelos/estados';
import { Sucursales } from '../modelos/estados';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  ApiUri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  //Estados
  getEstados(): Observable<Estados[]> {
    return this.http.get<Estados[]>(`${this.ApiUri}/api/estado`)
      .pipe(
        map(res => res)
      );
  }

  addEstados (newEstado : Estados){
    return this.http.post<Estados>(`${this.ApiUri}/api/estado`, newEstado)
      .pipe(
        map(res => res)
      )
  }

  deleteEstado(_id:String){
    return this.http.delete(`${this.ApiUri}/api/estado/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateEstado(newEstado : Estados){
    return this.http.put(`${this.ApiUri}/api/estado/${newEstado._id}`, newEstado)
    .pipe(
      map (res=> res)
    )
  }

  //Ciudades
  getCiudades(): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(`${this.ApiUri}/api/ciudad`)
      .pipe(
        map(res => res)
      );
  }

  addCiudad (newCiudad : Ciudades){
    return this.http.post<Ciudades>(`${this.ApiUri}/api/ciudad`, newCiudad)
      .pipe(
        map(res => res)
      )
  }

  deleteCiudad(_id:String){
    return this.http.delete(`${this.ApiUri}/api/ciudad/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateCiudad(newCiudad : Ciudades){
    return this.http.put(`${this.ApiUri}/api/ciudad/${newCiudad._id}`, newCiudad)
    .pipe(
      map (res=> res)
    )
  }

  //Sucursales
  getSucursales(): Observable<Sucursales[]> {
    return this.http.get<Sucursales[]>(`${this.ApiUri}/api/sucursal`)
      .pipe(
        map(res => res)
      );
  }

  addSucursales (newSucursal : Sucursales){
    return this.http.post<Sucursales>(`${this.ApiUri}/api/sucursal`, newSucursal)
      .pipe(
        map(res => res)
      )
  }

  deleteSucursal(_id:String){
    return this.http.delete(`${this.ApiUri}/api/sucursal/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateSucursal(newSucursal : Sucursales){
    return this.http.put(`${this.ApiUri}/api/sucursal/${newSucursal._id}`, newSucursal)
    .pipe(
      map (res=> res)
    )
  }
}
