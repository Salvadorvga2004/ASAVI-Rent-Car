import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { Modelos } from '../modelos/modelos';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  ApiUri = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getModelos(): Observable<Modelos[]> {
    return this.http.get<Modelos[]>(`${this.ApiUri}/api/modelo`)
      .pipe(
        map(res => res)
      );
  }

  addModelos (newModelo : Modelos){
    return this.http.post<Modelos>(`${this.ApiUri}/api/modelo`, newModelo)
      .pipe(
        map(res => res)
      )
  }

  deleteModelo(_id:String){
    return this.http.delete(`${this.ApiUri}/api/modelo/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateModelo(newModelo : Modelos){
    return this.http.put(`${this.ApiUri}/api/modelo/${newModelo._id}`, newModelo)
    .pipe(
      map (res=> res)
    )
  }
}