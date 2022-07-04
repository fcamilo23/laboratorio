import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Previa } from '../clases/previa';
import { UnidadCurricular } from '../clases/unidadCurricular';

@Injectable({
  providedIn: 'root'
})
export class PreviaService {
  @Output() disparadorPrevias: EventEmitter<any> = new EventEmitter();
  private apiURL: string = environment.apiURL + '/Previas';
  private noticias:Observable<Previa>[]=[];

  public unidadActual!: UnidadCurricular;

  constructor(private http: HttpClient) {}

  create(datos:Previa){
    return this.http.post<Previa>(this.apiURL, datos);
  }
  
  delete(id:number){
    return this.http.delete<Previa>(this.apiURL + '/' + id);
  }

  guardarUnidad(unidad: UnidadCurricular){
    this.unidadActual = unidad;
  }

  devolverUnidad(){
    return this.unidadActual;
  }
  
  }
