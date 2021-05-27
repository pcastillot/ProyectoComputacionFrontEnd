export class Comunidad{
    public CODAUTO:number;
    public AUTONOMIA:string;
    public TEXTO_AUTONOMIA:string;

    constructor(codAuto:number, autonomia:string, textoAutonomia:string){
        this.CODAUTO = codAuto;
        this.AUTONOMIA = autonomia;
        this.TEXTO_AUTONOMIA = textoAutonomia;
    }

    public get getCodAuto():number{
        return this.CODAUTO;
    }

    public set setCodAuto(codAuto: number){
        this.CODAUTO = codAuto;
    }

    public get getAutonomia(): string {
        return this.AUTONOMIA;
    }

    public set setAutonomia(autonomia: string) {
        this.AUTONOMIA = autonomia;
    }

    public get getTextoAutonomia(): string {
        return this.TEXTO_AUTONOMIA;
    }

    public set setTextoAutonomia(textoAutonomia: string) {
        this.TEXTO_AUTONOMIA = textoAutonomia;
    }
}