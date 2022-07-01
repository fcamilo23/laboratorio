export class Documento {
  public id = 0;
  public titulo!:string;
  public tipo!:string;
  public documentoPDF!:string;
  public activo = true;
  constructor(t:string,tip:string,doc:string){
    this.id=0;
    this.titulo=t;
    this.tipo=tip;
    this.documentoPDF=doc;
    this.activo=true;
  }
}