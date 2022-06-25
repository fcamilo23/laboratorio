import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticia!: Noticia;
  lstNoticias!: Noticia[];
  constructor(protected notiServ:NoticiasService) { }

  ngOnInit(): void {
    this.cargarLista();

  }
  cargarLista(){
    this.notiServ.getActivas().subscribe(
      (lst)=>{
        this.lstNoticias = lst;
      }
      
    );
    
  }
}
