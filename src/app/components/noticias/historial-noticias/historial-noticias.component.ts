import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasPaginadas } from 'src/app/clases/noticiasPaginadas';
import { NoticiasService } from 'src/app/service/noticias.service';
import Swal from 'sweetalert2';

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
  size!: number;
  loader!: boolean;



  constructor(protected notiServ:NoticiasService) { this.loader=true;}
  public noticiaForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.cargarLista(0,10);

    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
   
    //this.agregar();

  }
  agregar(){
   //let n = new Noticia(0,'facu','facu','facu','2022-12-12')
   //this.notiServ.create(n).subscribe();

  }

  eliminar(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn1 btn-success',
        cancelButton: 'btn1 btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
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

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La noticia ha sido eliminada',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Todo sigue como estaba!',
          'error'
        )
      }
    })
    

  }

  abrirEditar(index:number){
    this.noticiaActual = this.lstNoticias1.list[index];
    localStorage.setItem('noticiaActual', JSON.stringify(this.noticiaActual));
    window.location.href = ('/editarNoticia');
  }

  getNoticia(id:number){
      alert(id);
   }

   setPaginado(offset: number, limit:number){
      window.location.reload();
   }
  cargarLista(offset: number, limit:number){
    this.notiServ.getAll(offset,limit).subscribe(
      (lst)=>{
        this.lstNoticias1 = lst;
        this.size = this.lstNoticias1.size / 10;    
        this.loader=false;

      }
    );
   
    
  }
}
