import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Reservas } from '../modelos/reservas';


@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  ApiUri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  getReservas(): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(`${this.ApiUri}/api/reserva`)
      .pipe(
        map(res => res)
      );
  }

  addReservas (newReserva : Reservas){
    return this.http.post<Reservas>(`${this.ApiUri}/api/reserva`, newReserva)
      .pipe(
        map(res => res)
      )
  }

  deleteReserva(_id:String){
    return this.http.delete(`${this.ApiUri}/api/reserva/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updateReserva(newReserva : Reservas){
    return this.http.put(`${this.ApiUri}/api/reserva/${newReserva._id}`, newReserva)
    .pipe(
      map (res=> res)
    )
  }
}
