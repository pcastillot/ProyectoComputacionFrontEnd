export class Colegio{

    public idColegio:number;
    public idMunicipio:number;
    public localidad:string;
    public idProvincia:number;
    public provincia:string;
    public denomGenerica:string;
    public denomEspesifica:string;
    public naturaleza:string;
    public domicilio:string;
    public cPostal:number;
    public telefono:string;

    constructor(idColegio:number, idMunicipio:number, localidad:string, idProvincia:number, provincia:string,
                denomGenerica:string, denomEspesifica:string, naturaleza:string, domicilio:string, cPostal:number,
                telefono:string){
        this.idColegio = idColegio;
        this.idMunicipio = idMunicipio;
        this.localidad = localidad;
        this.idProvincia = idProvincia;
        this.provincia = provincia;
        this.denomGenerica = denomGenerica;
        this.denomEspesifica = denomEspesifica;
        this.naturaleza = naturaleza;
        this.domicilio = domicilio;
        this.cPostal = cPostal;
        this.telefono = telefono;
    }

}