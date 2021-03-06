import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticiaActual!: Noticia;
  lstNoticias!: Noticia[];
  logueado!: string;
  loader!: boolean;



  constructor(protected notiServ:NoticiasService) { this.loader=true;}
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
    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn1 btn-success',
        cancelButton: 'btn1 btn-danger'
      },
      buttonsStyling: false
    })
    
    swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.notiServ.delete(id).subscribe();

        swal.fire(
          'Eliminado!',
          'La noticia ha sido eliminada',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelado',
          'Todo sigue como estaba!',
          'error'
        )
      }
    })
    

  }

  abrirEditar(index:number){
    this.noticiaActual = this.lstNoticias[index];
    localStorage.setItem('noticiaActual', JSON.stringify(this.noticiaActual));
    window.location.href = ('/editarNoticia');
  }
  abrirVer(index:number){
    window.location.href = ('verNoticia');
    this.noticiaActual = this.lstNoticias[index];
    localStorage.setItem('noticiaActual', JSON.stringify(this.noticiaActual));
  }
  abrirNoticia(index:number){
    this.noticiaActual = this.lstNoticias[index];
    localStorage.setItem('noticiaActual', JSON.stringify(this.noticiaActual));
  }

  getNoticia(id:number){
      alert(id);
   }

  cargarLista(){
    this.notiServ.getActivas().subscribe(
      (lst)=>{
        this.lstNoticias = lst;
        this.loader=false;
      }
      
    );
    
  }
 
}
