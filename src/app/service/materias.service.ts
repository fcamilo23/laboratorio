/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor() { }
}
*/

import { Materia } from './../clases/materia';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiURL: string = environment.apiURL + '/Materias';
  private materia:Observable<Materia>[]=[];

  constructor(private http: HttpClient) {}

  /*set(t:string,d:string,im:string,f=new Date(3/5/2022)){
    const id=this.noticias.length;
    this.noticias.subscribe(new Noticia(id,t,d,im,f));
  }*/

  getAll(){
    return this.http.get<Materia[]>(this.apiURL);
  }
  create(datos:Materia){
    return this.http.post<Materia>(this.apiURL, datos);

  }
  edit(datos:Materia){
    return this.http.put<Materia>(this.apiURL + '/' + datos.id, datos);
  }
  delete(id:number){
    return this.http.delete<Materia>(this.apiURL + '/' + id);
  }

 /* get(id:number):Observable<Noticia>{
    const newLocal = this.noticias.find(n => n.id=id);
    return newLocal;
  }*/

}
