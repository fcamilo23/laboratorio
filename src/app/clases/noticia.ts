import { DatePipe } from "@angular/common";

export class Noticia {
  id:number= 0;
  titulo: string="";
  descripcion: string="";
  imagen:string="";
  fechaCaducidad= new Date();

  constructor(id: number, titulo: string, d:string,i:string,f:Date) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion=d;
      this.imagen=i;
      this.fechaCaducidad=f;
  }
}
