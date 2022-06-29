import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/service/noticias.service';
import { CarouselService } from 'src/app/service/carousel.service';
import { Carousel } from 'src/app/clases/carousel';
import { Noticia } from 'src/app/clases/noticia';
import { Login } from 'src/app/clases/login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lstNoticias!: Noticia[];
  carousel!:Carousel[];
  imagen!:any[];


  


  constructor(protected noticiaService:NoticiasService, private carouselServices:CarouselService) { }

  ngOnInit(): void {
    //let loginData:Login = localStorage.getItem('loginData');
    var token = localStorage.getItem('loginData');

    this.carouselServices.getCarousel().then(carousel => {
      this.carousel = carousel;
    })
    



    
  }


  getActivas(){
    this.noticiaService.getActivas().subscribe(
      (lst)=>{
        this.lstNoticias = lst;
        
      }
      
    );
  }
 

}
