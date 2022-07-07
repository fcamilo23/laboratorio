import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-noticia',
  templateUrl: './alta-noticia.component.html',
  styleUrls: ['./alta-noticia.component.css']
})
export class AltaNoticiaComponent implements OnInit {
  fechaActual!: string;
  

  

  public altaNoticiaForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required])


  });
  imagenVistaPrevia:String ="";


  constructor(protected notiServ:NoticiasService, protected router:Router) { }
  ngOnInit(): void {
    
    this.getFechaActual();

  }

  getFechaActual(){

    var today = new Date();
    var fech: string;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    fech = yyyy + '-' + mm + '-' + dd;
    this.fechaActual = fech;
  }

 vaciarCampos(){
  this.altaNoticiaForm.controls['titulo'].setValue('');
  this.altaNoticiaForm.controls['descripcion'].setValue('');
  this.altaNoticiaForm.controls['imagen'].setValue('');
  this.altaNoticiaForm.controls['fecha'].setValue('');
 }

  addNoticia(){
    if(localStorage.getItem('logueado') == '1'){
    let titulo = this.altaNoticiaForm.controls['titulo'].value;
    let descripcion = this.altaNoticiaForm.controls['descripcion'].value;
    let imagen = this.altaNoticiaForm.controls['imagen'].value;
    let fecha = this.altaNoticiaForm.controls['fecha'].value;


    let n = new Noticia(0,titulo,descripcion,imagen,fecha)
    if(this.notiServ.create(n).subscribe()){
      this.vaciarCampos();
      Swal.fire('Perfecto!', 'Se ha agregado la noticia correctamente', 'success');
      this.router.navigate(['/noticias']);

    }else{
      Swal.fire('Error!', '', 'error');

    }
  }else{
    Swal.fire('Error!', 'Debe estar logueado para realizar esta accion', 'error');

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
      this.altaNoticiaForm.controls['imagen'].setValue("");
      this.restablecerAImagenPorDefecto();
    }
  }
  obtenerStringImagen(e:any) {
    let strImg = "data:image/png;base64," + btoa(e.target.result);
    this.altaNoticiaForm.controls['imagen'].setValue(strImg);
    this.imagenVistaPrevia = this.altaNoticiaForm.controls['imagen'].value;
  }
  // ***** Fin de Funciones para cargar y convertir imagen *************************

  private restablecerAImagenPorDefecto() {
    this.imagenVistaPrevia = "/assets/images/default-image.png";
  }
}