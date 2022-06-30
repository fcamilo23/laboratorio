import { Login } from './../clases/login';
import { Token } from './../clases/token';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuteticacionService {

  private apiURL: string = environment.apiURL + '/Authenticate';
  private userToken: Token | undefined;
  private loginDataStoreKey:string = "loginData";

  constructor(private http: HttpClient) { }

  logged(us:string,pass:string){
    const l = new Login(us,pass);
    return this.http.post<Login>(this.apiURL + '/login', l).pipe(
      tap((data) => {
        localStorage.setItem(this.loginDataStoreKey, JSON.stringify(data));
        localStorage.setItem('logueado', JSON.stringify(1));
      })
    );
  }
}

