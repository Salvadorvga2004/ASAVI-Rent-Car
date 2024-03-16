import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { Usuario } from '../modelos/usuarios';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  ApiUri = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.ApiUri}/api/Usuarios`)
      .pipe(
        map(res => res)
      );
  }
}
