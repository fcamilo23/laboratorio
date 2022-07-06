import { Noticia } from './../clases/noticia';
import { NoticiasPaginadas } from './../clases/noticiasPaginadas';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiURL: string = environment.apiURL + '/Noticias';
  private noticias:Observable<Noticia>[]=[];


  constructor(private http: HttpClient) {}

  /*set(t:string,d:string,im:string,f=new Date(3/5/2022)){
    const id=this.noticias.length;
    this.noticias.subscribe(new Noticia(id,t,d,im,f));
  }*/

  getAll(offset:number, limit:number){
    return this.http.get<NoticiasPaginadas>(this.apiURL + '/Paged/'+offset+'/'+limit);
    
  }
  create(datos:Noticia){

    return this.http.post<Noticia>(this.apiURL, datos);

  }
  getActivas(){
    return this.http.get<Noticia[]>(this.apiURL + '/Activas');
  }


  get(id:number){
    return this.http.get<Noticia>(this.apiURL + '/' + id);
  }
  edit(datos:Noticia){
    return this.http.put<Noticia>(this.apiURL + '/' + datos.id, datos);
  }
  delete(id:number){
    return this.http.delete<Noticia>(this.apiURL + '/' + id);

  }

 /* get(id:number):Observable<Noticia>{
    const newLocal = this.noticias.find(n => n.id=id);
    return newLocal;
  }*/

}
