export class Estados {
    _id?: string;
    Pais?: string;
    Estados: { 
        ClaveEstado: string, 
        NombreEstado: string 
    }[] = [];
}
