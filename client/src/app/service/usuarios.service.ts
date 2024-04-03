import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Clientes,Usuarios } from '../modelos/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  ApiUri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }
  
  //Clientes
  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.ApiUri}/api/cliente`)
      .pipe(
        map(res => res)
      );
  }

  addClientes (newcliente : Clientes){
    return this.http.post<Clientes>(`${this.ApiUri}/api/cliente`, newcliente)
      .pipe(
        map(res => res)
      )
  }

  deletecliente(_id:String){
    return this.http.delete(`${this.ApiUri}/api/cliente/${_id}`)
    .pipe(
      map(res=>res)
    )
  }

  updatecliente(newcliente : Clientes){
    return this.http.put(`${this.ApiUri}/api/cliente/${newcliente._id}`, newcliente)
    .pipe(
      map (res=> res)
    )
  }

  //Usuarios
  getUsuarios(Correo:string,Contrasena: string): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.ApiUri}/api/usuario/${Correo}/${Contrasena}`)
      .pipe(
        map(res => res)
      );
  }

  addUsuarios (newusuario : Usuarios){
    return this.http.post<Usuarios>(`${this.ApiUri}/api/usuario`, newusuario)
      .pipe(
        map(res => res)
      )
  }
}
