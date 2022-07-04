import { UnidadCurricular } from "./unidadCurricular";

export class Previa {
    public unidadCurricular: UnidadCurricular;
    public previa: UnidadCurricular;
    public tipo: string;
   
    constructor(unidadCurricular: UnidadCurricular, previa: UnidadCurricular, tipo: string) {
        this.unidadCurricular = unidadCurricular;
        this.previa = previa;
        this.tipo = tipo;
    }
}