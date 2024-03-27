export class Estados {
    _id?: string;
    Pais?: string;
    Estados: { 
        ClaveEstado: string, 
        NombreEstado: string 
    }[] = [];
}

export class Ciudades {
    _id?: string;
    Pais?: string;
    Estados?: string
    Ciudades: { 
        ClaveCiudad: string, 
        NombreCiudad: string 
    }[] = [];
}

export class Sucursales {
    _id?: string;
    Pais?: string;
    Estados?: string
    Ciudades?: string
    Sucursales: { 
        ClaveSucursal: string, 
        NombreSucursal: string,
        Telefono: string 
    }[] = [];
}
