import { UnidadCurricularComponent } from "../components/unidad-curricular/unidad-curricular.component";
import { UnidadCurricular } from "./unidadCurricular";

export class PreviaUnidad {
    public unidadCurricular: UnidadCurricular;
    public previa: UnidadCurricular;
    public tipo: string;
   
    constructor(unidadCurricular: UnidadCurricular, previa: UnidadCurricular, tipo: string) {
        this.unidadCurricular = unidadCurricular;
        this.previa = previa;
        this.tipo = tipo;
    }
}