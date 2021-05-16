export class Municipio{

    private CODMU: number;
    private MUNICIPIO:string;
    private CODPROV:number;
    
    constructor(codMun:number, municipio:string, codProv:number){
        this.CODMU = codMun;
        this.MUNICIPIO = municipio;
        this.CODPROV = codProv;
    }

    public get getCodmun():number{
        return this.CODMU;
    }

    public set setCodmun(cod_mun_new: number) {
        this.CODMU = cod_mun_new;
    }

    public get getMunicipio():string{
        return this.MUNICIPIO;
    }

    public set setMunicipio(nombre_mun_new: string) {
        this.MUNICIPIO = nombre_mun_new;
    }

    public get getCodprov():number{
        return this.CODPROV;
    }

    public set setCodprov(cod_prov_new:number){
        this.CODPROV = cod_prov_new;
    }

}

