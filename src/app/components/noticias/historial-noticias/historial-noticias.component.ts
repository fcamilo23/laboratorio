import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasPaginadas } from 'src/app/clases/noticiasPaginadas';
import { NoticiasService } from 'src/app/service/noticias.service';

@Component({
  selector: 'app-historial-noticias',
  templateUrl: './historial-noticias.component.html',
  styleUrls: ['./historial-noticias.component.css']
})
export class HistorialNoticiasComponent implements OnInit {
  noticiaActual!: Noticia;
  lstNoticias!: Noticia[];
  lstNoticias1!: NoticiasPaginadas;
  logueado!: string;


  constructor(protected notiServ:NoticiasService) { }
  public noticiaForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
    //this.agregar();

  }
  agregar(){
   //let n = new Noticia(0,'facu','facu','facu','2022-12-12')
   //this.notiServ.create(n).subscribe();

  }

  eliminar(id:number){
    if(confirm("Está seguro que desea eliminar esta noticia?")){
      this.notiServ.delete(id).subscribe();
      alert("Se ha eliminado correctamente la noticia");
      window.location.reload();

    }

  }

  abrirEditar(index:number){
    this.noticiaActual = this.lstNoticias[index];
    localStorage.setItem('noticiaActual', JSON.stringify(this.noticiaActual));
    window.location.href = ('/editarNoticia');
  }

  getNoticia(id:number){
      alert(id);
   }

  cargarLista(){
    this.notiServ.getAll().subscribe(
      (lst)=>{
        this.lstNoticias1 = lst;
      }
      
    );
    
  }
}
