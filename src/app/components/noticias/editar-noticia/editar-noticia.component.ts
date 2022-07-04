import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {
  public editNoticiaForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),

  });

  noticia!: Noticia;
  
  constructor(protected notiServ:NoticiasService) { }

  ngOnInit(): void {
    
    this.cargarDatos();  
    
   //   this.noticia = this.notiServ.get(parseInt(id)).subscribe();
  }
  getImagen(){
    return this.noticia.imagen;
  }

  cargarDatos(){
    this.noticia = JSON.parse(localStorage.getItem("noticiaActual") || '{}');
    this.editNoticiaForm.controls['titulo'].setValue(this.noticia.titulo);
    this.editNoticiaForm.controls['descripcion'].setValue(this.noticia.descripcion);
    this.editNoticiaForm.controls['fecha'].setValue(this.noticia.fechaCaducidad);


  }

  editar(){
    if(this.editNoticiaForm.controls['titulo'].value != "" && 
    this.editNoticiaForm.controls['descripcion'].value != "" &&
     this.editNoticiaForm.controls['fecha'].value != ""
      ){

    this.noticia.titulo =  this.editNoticiaForm.controls['titulo'].value;
    this.noticia.descripcion =  this.editNoticiaForm.controls['descripcion'].value;
    this.noticia.fechaCaducidad =  this.editNoticiaForm.controls['fecha'].value;
    if(this.editNoticiaForm.controls['imagen'].value != ""){
      this.noticia.imagen =  this.editNoticiaForm.controls['imagen'].value;
    }

    
    if(localStorage.getItem('logueado') == '1'){
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
            this.notiServ.edit(this.noticia).subscribe();
    
            swalWithBootstrapButtons.fire(
              'Perfecto!',
              'Los cambios han sido guardados',
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
        
  
    }else{
      Swal.fire('Error!', 'Debe estar logueado para realizar esta accion', 'error');

    }
  }else{
    Swal.fire('Error!', 'No pueden quedar campos vacios', 'error');

  }
  }

  alCargarImagen(evt: any) {
    const archivo = evt.target.files[0];
    
    // Si realmente se cargo un archivo
    if (archivo) {
      const lector = new FileReader();
      
      lector.onload = this.obtenerStringImagen.bind(this);
      lector.readAsBinaryString(archivo);
      // OJO que el string con la imagen demora unos milisegundos en cargarse
    }else{
      // aca no se como hacer que entre, pero por las dudas le pongo esto...
      this.editNoticiaForm.controls['imagen'].setValue("");
    }
  }
  obtenerStringImagen(e:any) {
    let strImg = "data:image/png;base64," + btoa(e.target.result);
    this.editNoticiaForm.controls['imagen'].setValue(strImg);
  }
  // ***** Fin de Funciones para cargar y convertir imagen *************************



}
