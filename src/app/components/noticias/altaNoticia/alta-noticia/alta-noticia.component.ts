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

  constructor(protected notiServ:NoticiasService) { }
  ngOnInit(): void {

  }

  addNoticia(){
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


  }

}
