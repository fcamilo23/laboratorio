import { Materia } from "./materia";
import { Previa } from "./previa";
import { PreviaUnidad } from "./PreviaUnidad";

export class UnidadCurricularSave {
    public id: number;
    public nombre: string;
    public descripcion: string;
    public creditos: number;
    public documento: string;
    public semestre: number;
    public materia: Materia;
    public previas: PreviaUnidad[];


    constructor(id: number, nombre: string, descripcion: string, creditos: number, documento: string, semestre: number, materia: Materia, previas: PreviaUnidad[]) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.creditos = creditos;
        this.documento = documento;
        this.semestre = semestre;
        this.materia = materia;
        this.previas = previas;
    }
  
  }