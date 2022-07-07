import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Previa } from '../clases/previa';
import { PreviaSave } from '../clases/previaSave';

@Injectable({
  providedIn: 'root'
})
export class PreviaService {
  private apiURL: string = environment.apiURL + '/Previas';
  private noticias:Observable<Previa>[]=[];

  constructor(private http: HttpClient) {}

  create(datos:PreviaSave){
    return this.http.post<Previa>(this.apiURL, datos);
  }
  
  delete(id:number){
    return this.http.delete<Previa>(this.apiURL + '/' + id);
  }
}
