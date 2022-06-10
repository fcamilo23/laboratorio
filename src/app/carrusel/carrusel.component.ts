import { Observable } from 'rxjs';
import { NoticiasService } from './../service/noticias.service';
import { CUSTOM_ELEMENTS_SCHEMA,Component, OnInit } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import { Noticia } from '../clases/noticia';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  responsiveOptions;
  public noticias: Noticia[] = [];
  constructor(private serviceNoticia:NoticiasService) {
    this.responsiveOptions = [{
                                breakpoint: '1024px',
                                numVisible: 3,
                                numScroll: 3
                            },
                            {
                                breakpoint: '768px',
                                numVisible: 2,
                                numScroll: 2
                            },
                            {
                                breakpoint: '560px',
                                numVisible: 1,
                                numScroll: 1
                            }];
   }

  ngOnInit(): void {
    this.serviceNoticia.getAll().subscribe({
      next: value => this.noticias = value,
      error: err => { alert('Error al cargar las noticias: ' + err) }
    });
  }

}
