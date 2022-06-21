export class Materia {
    public id: number;
    public nombre: string;
    public descripcion: string;
    public creditosMinimos: number;
  
    constructor(id: number, nombre: string, descripcion: string, creditosMinimos: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.creditosMinimos = creditosMinimos;
    }
  
}