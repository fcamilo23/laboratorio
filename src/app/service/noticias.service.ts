import { Noticia } from './../clases/noticia';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  constructor(private http: HttpClient) {}

  set(t:string,d:string,im:string,f=new Date(3/5/2022)):Observable<Noticia>{
    const noti= new Noticia(0,t,d,im,f)
     return this.http.post<Noticia>("/api/Noticias", noti);
  }

  getAll(){
    return this.http.get<Noticia[]>('https://ria2022.test.softtero.com/api/Noticias/Activas');
  }

 /* get(id:number):Observable<Noticia>{
    const newLocal = this.noticias.find(n => n.id=id);
    return newLocal;
  }*/

}
