import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autos } from '../modelos/auto';
import { Observable, map } from 'rxjs';
import { TipoAutos } from '../modelos/tipoAuto';

@Injectable({
  providedIn: 'root'
})
export class TipoAutoService {

  ApiUri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  getTipoAutos(): Observable<TipoAutos[]> {
    return this.http.get<TipoAutos[]>(`${this.ApiUri}/api/tipoAuto`)
      .pipe(
        map(res => res)
      );
  }

  

  addTipoAutos (newTipoAuto : TipoAutos){
    return this.http.post<TipoAutos>(`${this.ApiUri}/api/tipoAuto`, newTipoAuto)
      .pipe(
        map(res => res)
      )
  }

  deleteTipoAuto(_id:String){
    return this.http.delete(`${this.ApiUri}/api/tipoAuto/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateTipoAuto(newTipoAuto : TipoAutos){
    return this.http.put(`${this.ApiUri}/api/tipoAuto/${newTipoAuto._id}`, newTipoAuto)
    .pipe(
      map (res=> res)
    )
  }
}
