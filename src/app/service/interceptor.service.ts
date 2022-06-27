
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../clases/token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorTokenService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let x  = localStorage.getItem("loginData");
    alert('interceptor ');


    if(x != null){
      let loginData:Token = JSON.parse(x);

      localStorage.setItem('x', JSON.stringify(loginData.token));
    


    if (loginData != null){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + loginData.token
      });
      const copia = req.clone({
        headers
      });
      return next.handle(copia);
    }else{
      const copia = req.clone();
      return next.handle(copia);
    }
  }else{
        const copia = req.clone();
        return next.handle(copia);
  }
}


}