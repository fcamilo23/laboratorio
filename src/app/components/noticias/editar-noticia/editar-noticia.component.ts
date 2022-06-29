import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/clases/noticia';
import { NoticiasService } from 'src/app/service/noticias.service';
import { environment } from 'src/environments/environment';

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
      if(confirm("Desea guardar los cambios realizados?")){
        this.notiServ.edit(this.noticia).subscribe();
        alert("Se han guardado los cambios exitosamnete!");
        window.location.href = ('/noticias');
      }
    }else{
      alert('Debe estar logueado para realizar esta accion');
    }
  }else{
    alert('No pueden quedar campos vacios');
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
