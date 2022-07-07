import { UnidadCurricular } from "./unidadCurricular";

export class Previa {
    public id: number;
    public unidadCurricular: UnidadCurricular;
    public previa: UnidadCurricular;
    public tipo: string;
   
    constructor(id: number, unidadCurricular: UnidadCurricular, previa: UnidadCurricular, tipo: string) {
        this.id = id;
        this.unidadCurricular = unidadCurricular;
        this.previa = previa;
        this.tipo = tipo;
    }
}