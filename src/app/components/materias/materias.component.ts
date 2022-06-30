import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/clases/materia';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { MateriaService } from 'src/app/service/materias.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements OnInit {

  materia!: Materia;
  lstMaterias!: Materia[];
  lstUnidades!: UnidadCurricular[];
  logueado!: string;

  constructor(protected materiaService: MateriaService, protected unidadService: UnidadCurricularService) { }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }


   eliminar(id: number){
    if(confirm('Desea eliminar esta materia?')){
      this.unidadService.getAll().subscribe(
        (lst2)=>{
          this.lstUnidades = lst2;
          for (let unidad of this.lstUnidades){
            if(unidad.materia.id==this.materia.id){
              /*if(unidad.previas.length>0){
                for (let previa of unidad.previas){
                  this.previasService.delete(previa.previa).subscribe();
                }
              }*/
              this.unidadService.delete(unidad.id).subscribe();
            }
          }
      });

      
    this.materiaService.delete(id).subscribe();
    }
  }

  cargarLista(){
    this.materiaService.getAll().subscribe(
      (lst1)=>{
        this.lstMaterias = lst1;
      }
    );
  }
}
