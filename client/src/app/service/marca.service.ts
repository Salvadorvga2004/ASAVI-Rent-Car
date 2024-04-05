import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoAutos } from '../modelos/tipoAuto';
import { Observable, map } from 'rxjs';
import { Marcas } from '../modelos/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  ApiUri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  getMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(`${this.ApiUri}/api/marca`)
      .pipe(
        map(res => res)
      );
  }

  

  addMarca (newMarca : Marcas){
    return this.http.post<Marcas>(`${this.ApiUri}/api/marca`, newMarca)
      .pipe(
        map(res => res)
      )
  }

  deleteMarca(_id:String){
    return this.http.delete(`${this.ApiUri}/api/marca/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateMarca(newMarca : Marcas){
    return this.http.put(`${this.ApiUri}/api/marca/${newMarca._id}`, newMarca)
    .pipe(
      map (res=> res)
    )
  }
}
