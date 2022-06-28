import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/service/noticias.service';
import { Noticia } from 'src/app/clases/noticia';
import { Login } from 'src/app/clases/login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  


  constructor(protected noticiaService:NoticiasService) { }

  ngOnInit(): void {
    //let loginData:Login = localStorage.getItem('loginData');
    var token = localStorage.getItem('loginData');
    

    



    
  }

 

}
