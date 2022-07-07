import { UnidadCurricular } from "./unidadCurricular";

export class Previa {
    public id: number;
    public unidadCurricular: UnidadCurricular;
    public previa: UnidadCurricular;
    public tipoPrevia: string;
   
    constructor(id: number, unidadCurricular: UnidadCurricular, previa: UnidadCurricular, tipoPrevia: string) {
        this.id = id;
        this.unidadCurricular = unidadCurricular;
        this.previa = previa;
        this.tipoPrevia = tipoPrevia;
    }
}