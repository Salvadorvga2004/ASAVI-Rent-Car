import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Autos } from '../modelos/auto';
import { Sucursales } from '../modelos/estados';
import { Modelos } from '../modelos/modelos';
import { Extras } from '../modelos/extras';
import { Reservas } from '../modelos/reservas';

@Injectable({
  providedIn: 'root'
})
export class EnviarService {
  private auto$ = new BehaviorSubject<Autos>(iniAuto);
  private modelo$ = new BehaviorSubject<Modelos>(initModelos);
  private sucursales$ = new BehaviorSubject<Sucursales>(initSucursales);
  private extras$ = new BehaviorSubject<Extras>(initExtras);
  private reserva$ = new BehaviorSubject<Reservas>(initReserva);


  constructor(){
  
  }
 
  get selectedAuto$(): Observable<Autos>{
   return this.auto$.asObservable();
  }

  get selectedReserva$(): Observable<Reservas>{
   return this.reserva$.asObservable();
  }
 
  get selectedSucursal$(): Observable<Sucursales>{
   return this.sucursales$.asObservable();
  }
  
  get selectedModelo$(): Observable<Modelos>{
    return this.modelo$.asObservable();
   }

  get selectedExtra$(): Observable<Extras>{
    return this.extras$.asObservable();
  }
 
  setReserva(reserva:Reservas): void{
   this.reserva$.next(reserva);
  }
 
  setSucursal(sucursal:Sucursales): void{
   this.sucursales$.next(sucursal);
  }
 
  setModelo(modelo: Modelos): void {
   this.modelo$.next(modelo);
  }

  setExtra(extra: Extras): void {
    this.extras$.next(extra);
   }

   setAuto(auto: Autos): void {
    this.auto$.next(auto);
   }
 
}
 
 const initModelos: Modelos = {
    _id: '',
    Modelo: '',
    Tipo: '',
    Marca: '',
    Transmision: '',
    NumPasajeros: 0,
    NumMaletas: 0,
    AireAcondicionado: '',
    Radio: '',
    PagoPorDia: 0,
    UrlImagen: '',
    CantidadAutos: 0,
  };
 
  const initExtras: Extras = {
    _id : '',
    ClaveExtra: '',
    NomArticulo: '',
    Descripcion: '',
    Precio: 0,
  };
 
  const iniAuto: Autos = {
    _id : '',
    NumSerie: '',
    Kilometraje :0,
    EstadoCarroceria : '',
    Ubicacion : '',
    EstatusAuto : '',
    ModeloAuto : '',
    ClaveReserva :'',

  };

const initSucursales: Sucursales = {
    _id: '',
    Pais: '',
    Estados: '',
    Ciudades: '',
    Sucursales: [{
        ClaveSucursal: '',
        NombreSucursal: '',
        Telefono: ''
    }]
};


   const initReserva: Reservas = {
    _id: '',
    ClaveReserva: '',
    NumSerie: '',
    ClaveExtra: '',
    ModeloAuto: '',
    FechaEntrega: new Date(),
    HoraEntrega: '',
    SucursalEntrega: '',
    FechaRegreso: new Date(),
    HoraRegreso: '',
    SucursalRegreso: '',
    Estatus: '',
    Total: 0,
    Correo: '', 
   };