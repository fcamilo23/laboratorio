import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
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
  logueado!: string;


  constructor(protected notiServ:NoticiasService) { }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
    //this.agregar();

  }
  agregar(){
   let n = new Noticia(0,'facu','facu','facu','2022-12-12')
   this.notiServ.create(n).subscribe();

  }

  getNoticia(id:number){
      alert(id);
   }

  cargarLista(){
    this.notiServ.getActivas().subscribe(
      (lst)=>{
        this.lstNoticias = lst;
      }
      
    );
    
  }
}
