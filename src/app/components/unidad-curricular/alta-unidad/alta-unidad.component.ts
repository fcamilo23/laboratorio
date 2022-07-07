import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { Previa } from 'src/app/clases/previa';
import {PanelModule} from 'primeng/panel';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { MateriaService } from 'src/app/service/materias.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';
import { PreviaService } from 'src/app/service/previa.service';
import { PreviaSave } from 'src/app/clases/previaSave';
import swal from 'sweetalert2';

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

  public previasForm: FormGroup = new FormGroup({
    unidad: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  materiaX!: Materia;
  previas: Previa[] = [];
  letMaterias!: Materia[];
  logueado!: string;
  strImg!: string;
  letUnidades!: UnidadCurricular[];
  previaX!: PreviaSave;
  unidadX!: UnidadCurricular;
  tipo: string[] = [];
  unidad: number[] = [];

  constructor(protected materiaServi:MateriaService, protected uniServ:UnidadCurricularService, private router:Router, protected previaSer: PreviaService) { }
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
    this.uniServ.getAll().subscribe(
      (lst: any)=>{
        this.letUnidades = lst;
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

  addUnidad(){
    if(localStorage.getItem('logueado') == '1'){
    
      let nombre = this.altaUnidadForm.controls['nombre'].value;
      let descripcion = this.altaUnidadForm.controls['descripcion'].value;
      let creditos = this.altaUnidadForm.controls['creditos'].value;
      let documento = this.altaUnidadForm.get('documento')!.value;
      let semestre = this.altaUnidadForm.controls['semestre'].value;
      let materia = this.altaUnidadForm.controls['materia'].value; 

      this.buscarMateria(+materia);
 
      let n = new UnidadCurricular(0,nombre,descripcion,+creditos,this.strImg,+semestre,this.materiaX,this.previas);
      if(this.uniServ.create(n).subscribe()){
        swal.fire('Listo!','Se ha agregado la unidad curricular correctamente','success');
        this.router.navigate(['/unidadCurricular']);
      }else{
        alert('Ha ocurrido un error');
      }

  }else{
    swal.fire('Error!','Debe estar logueado para realizar esta accion','error');

    }
  }

 alCargarDocumento(evt: any) {
  const archivo = evt.target.files[0];

  if (archivo) {
    const lector = new FileReader();
    lector.onload = this.obtenerStringDocumento.bind(this);
    lector.readAsBinaryString(archivo);
  }else{
    this.altaUnidadForm.controls['documento'].setValue("");
  }
}
obtenerStringDocumento(e:any) {
  this.strImg = "data:application/pdf;base64," + btoa(e.target.result);
  this.altaUnidadForm.controls['documento'].setValue(this.strImg);
}

}