import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';

@Component({
  selector: 'app-alta-noticia',
  templateUrl: './alta-noticia.component.html',
  styleUrls: ['./alta-noticia.component.css']
})
export class AltaNoticiaComponent implements OnInit {
  

  public altaNoticiaForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required])


  });
  imagenVistaPrevia:String ="";


  constructor(protected notiServ:NoticiasService) { }
  ngOnInit(): void {

  }

  addNoticia(){
    if(localStorage.getItem('logueado') == '1'){
    let titulo = this.altaNoticiaForm.controls['titulo'].value;
    let descripcion = this.altaNoticiaForm.controls['descripcion'].value;
    let imagen = this.altaNoticiaForm.controls['imagen'].value;
    let fecha = this.altaNoticiaForm.controls['fecha'].value;


    let n = new Noticia(0,titulo,descripcion,imagen,fecha)
    if(this.notiServ.create(n).subscribe()){
      alert('Se ha agregado la noticia correctamente');
      window.location.href = ('/noticias');

    }else{
      alert('Ha ocurrido un error');

    }
  }else{
    alert('Debe estar logueado para realizar esta accion');

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