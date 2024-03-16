import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { Autos } from '../modelos/autos';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  ApiUri = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getAutos(): Observable<Autos[]> {
    return this.http.get<Autos[]>(`${this.ApiUri}/api/auto`)
      .pipe(
        map(res => res)
      );
  }

  addAutos (newAuto : Autos){
    return this.http.post(`${this.ApiUri}/api/auto`, newAuto)
      .pipe(
        map(res => res)
      )
  }

  deleteAuto(id:string){
    return this.http.delete(`${this.ApiUri}/api/auto/${id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateAuto(newAuto : Autos){
    return this.http.put(`${this.ApiUri}/api/auto/${newAuto.id}`, newAuto)
    .pipe(
      map (res=> res)
    )
  }
}
