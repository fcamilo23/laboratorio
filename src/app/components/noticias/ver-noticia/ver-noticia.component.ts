import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html',
  styleUrls: ['./ver-noticia.component.css']
})
export class VerNoticiaComponent implements OnInit {
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
