import { Documento } from './../clases/documento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiURL: string = environment.apiURL + '/Documentos';
  public docuselect!:Documento;
  //['INFORMACION_CARRERA', 'OPORTUNIDADES_LABORALES', 'DATOS_DE_INTERES']
  constructor(private http:HttpClient) { }

  getAllActivas(t:string){
  return this.http.get<Documento[]>(this.apiURL+"/Activos?tipo="+t);

  }

  altaDocumento(d:Documento){
    return this.http.post(this.apiURL,d);
  }

  Modificar(i:number, d:Documento){
      return this.http.put(this.apiURL+"/"+i,d);
  }
}