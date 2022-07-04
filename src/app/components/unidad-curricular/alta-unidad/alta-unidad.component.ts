import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { Previa } from 'src/app/clases/previa';
import { PreviaUnidad } from 'src/app/clases/PreviaUnidad';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { MateriaService } from 'src/app/service/materias.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';

@Component({
  selector: 'app-alta-unidad',
  templateUrl: './alta-unidad.component.html',
  styleUrls: ['./alta-unidad.component.css']
})
export class AltaUnidadComponent implements OnInit {

  public altaUnidadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    creditos: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.required]),
    materia: new FormControl('', [Validators.required]),
  });
  materiaX!: Materia;
  previas: Previa[] = [];
  letMaterias!: Materia[];
  logueado!: string;
  aux!: number;

  uploadedFiles: any[] = [];
  strImg!: string;


  constructor(protected materiaServi:MateriaService, protected uniServ:UnidadCurricularService, private router:Router) { }
  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }

  cargarLista(){
    this.materiaServi.getAll().subscribe(
      (lst: any)=>{
        this.letMaterias = lst;
      }
    );
  }

  buscarMateria(id: number){
    for(let x of this.letMaterias){
      if(x.id==id){
        this.materiaX = x;
      }
    }
  }

  addNoticia(){
    if(localStorage.getItem('logueado') == '1'){
    
      let nombre = this.altaUnidadForm.controls['nombre'].value;
      let descripcion = this.altaUnidadForm.controls['descripcion'].value;
      let creditos = this.altaUnidadForm.controls['creditos'].value;
      let semestre = this.altaUnidadForm.controls['semestre'].value;
      let materia = this.altaUnidadForm.controls['materia'].value; 

      this.buscarMateria(+materia);

      let n = new UnidadCurricular(0,nombre,descripcion,+creditos,this.strImg,+semestre,this.materiaX,this.previas);
      
      if(this.uniServ.create(n).subscribe()){
        alert('Se ha agregado la unidad correctamente');
        this.router.navigate(['/unidadCurricular']);
      }else{
        alert('Ha ocurrido un error');
      }

  }else{
    alert('Debe estar logueado para realizar esta accion');

    }
  }

 alCargarDocumento(evt: any) {
  const archivo = evt.target.files[0];

  // Si realmente se cargo un archivo
  if (archivo) {
    const lector = new FileReader();

    lector.onload = this.obtenerStringDocumento.bind(this);
    lector.readAsBinaryString(archivo);
    // OJO que el string con la imagen demora unos milisegundos en cargarse
  }else{
    // aca no se como hacer que entre, pero por las dudas le pongo esto...
    this.altaUnidadForm.controls['documento'].setValue("");
  }
}
obtenerStringDocumento(e:any) {
  this.strImg = "data:application/pdf;base64," + btoa(e.target.result);
  this.altaUnidadForm.controls['documento'].setValue(this.strImg);
}

}
