export class Clientes {
    _id?:string; 
    Nombre?:string; 
    ApPaterno?:string; 
    ApMaterno?:string; 
    Telefono?:string; 
    Pais?:string; 
    Estados?:string; 
    Ciudades?:string; 
    Municipio?:string; 
    Colonia?:string; 
    Calle?:string; 
    NumExterior?:number; 
    NumLicencia?:number; 
    EstadoEmision?:string; 
    FechaVencimientoLic?:Date; 
    FechaEmisionLic?:Date; 
    EstadoEmisionLic?:string; 
    UrlLicencia?:string; 
    NumIne?:string; 
    FechaVencimientoIne?:Date; 
    UrlIne?:string; 
    Correo?:string; 
    Contrasena?:string;

}

export class Usuarios {
    ClaveCliente ?:number;
    Correo?:string; 
    Contrasena?:string;
}