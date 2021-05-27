export interface ComunidadI{
    id:number;
    name:string;
}

export interface ProvinciaI{
    //id:number;
    codAuto: number;// codigo de la comunidad
    name:string;
}

export interface MunicipioI{
    //id:number;
    codProv: number;// codigo de provincia
    name:string;
}