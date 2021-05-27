export class Provincia {
    public CODPROV: number;
    public NOMBRE: string;
    public CODAUTO: number;

    constructor(codprov: number, nomber: string, codauto: number) {
        this.CODPROV = codprov;
        this.NOMBRE = nomber;
        this.CODAUTO = codauto;
    }

    public get getCprov(): number {
        return this.CODPROV;
    }

    public set setCprov(codprov: number) {
        this.CODPROV = codprov;
    }

    public get getNombre(): string {
        return this.NOMBRE;
    }

    public set setNombre(nombre: string) {
        this.NOMBRE = nombre;
    }
    
    public get getCodAuto(): number {
        return this.CODAUTO;
    }

    public set setCodAuto(codAuto: number) {
        this.CODAUTO = codAuto;
    }
}