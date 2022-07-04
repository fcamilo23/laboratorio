import { AuteticacionService } from './service/auteticacion.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from './clases/token';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //alert('interceptor ');

    let x  = localStorage.getItem("loginData");


    if(x != null){
      let loginData:Token = JSON.parse(x);

    


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