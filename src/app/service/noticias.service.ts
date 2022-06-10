import { Noticia } from './../clases/noticia';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private noticias:Observable<Noticia>[]=[];

  constructor(private http: HttpClient) {}

  /*set(t:string,d:string,im:string,f=new Date(3/5/2022)){
    const id=this.noticias.length;
    this.noticias.subscribe(new Noticia(id,t,d,im,f));
  }*/

  getAll(){
    return this.http.get<Noticia[]>('https://ria2022.test.softtero.com/api/Noticias/Activas');
  }

 /* get(id:number):Observable<Noticia>{
    const newLocal = this.noticias.find(n => n.id=id);
    return newLocal;
  }*/

}
