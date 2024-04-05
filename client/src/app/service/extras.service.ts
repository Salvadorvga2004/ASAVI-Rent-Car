import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Extras } from '../modelos/extras'; // Asegúrate de importar el modelo de datos correcto

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {
  ApiUri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  getExtras(): Observable<Extras[]> {
    return this.http.get<Extras[]>(`${this.ApiUri}/api/extras`);
  }

  addExtra(newExtra: Extras): Observable<Extras> {
    return this.http.post<Extras>(`${this.ApiUri}/api/extras`, newExtra);
  }

  deleteExtra(_id: string): Observable<any> {
    return this.http.delete(`${this.ApiUri}/api/extras/${_id}`);
  }

  updateExtra(updatedExtra: Extras): Observable<any> {
    return this.http.put(`${this.ApiUri}/api/extras/${updatedExtra._id}`, updatedExtra);
  }
}
