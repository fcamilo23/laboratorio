import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadCurricular } from '../clases/unidadCurricular';

@Injectable({
  providedIn: 'root'
})
export class UnidadCurricularService {
  private apiURL: string = environment.apiURL + '/UnidadesCurriculares';
  private noticias:Observable<UnidadCurricular>[]=[];

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<UnidadCurricular[]>(this.apiURL);
  }
  create(datos:UnidadCurricular){
    return this.http.post<UnidadCurricular>(this.apiURL, datos);
  }
  get(id:number){
    return this.http.get<UnidadCurricular>(this.apiURL + '/' + id);
  }
  edit(datos:UnidadCurricular){
    return this.http.put<UnidadCurricular>(this.apiURL + '/' + datos.id, datos);
  }
  delete(id:number){
    return this.http.delete<UnidadCurricular>(this.apiURL + '/' + id);
  }
}
