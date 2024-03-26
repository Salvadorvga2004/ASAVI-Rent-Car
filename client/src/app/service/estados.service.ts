import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { Estados } from '../modelos/estados';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  ApiUri = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

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
}
