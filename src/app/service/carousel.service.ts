import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../clases/noticia';
import { Carousel } from 'src/app/clases/carousel'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private apiURL: string = environment.apiURL + '/Noticias';
  private noticias:Observable<Noticia>[]=[];

  constructor(private http:HttpClient) { }
  getCarousel(){
    return this.http.get<any>('assets/archivosConfi/carousel.json')
    .toPromise()
    .then(res=><Carousel[]>res.data)
    .then(data => {return data; });
  }

  getActivas(){
      return this.http.get<Noticia[]>(this.apiURL + '/Activas')
      .toPromise()
      .then(res=><Noticia[]><unknown>this.noticias)
      .then(noticias => {return noticias;});
  }
}
