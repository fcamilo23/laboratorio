import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Previa } from 'src/app/clases/previa';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { PreviaService } from 'src/app/service/previa.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';

@Component({
  selector: 'app-unidad-curricular',
  templateUrl: './unidad-curricular.component.html',
  styleUrls: ['./unidad-curricular.component.css']
})
export class UnidadCurricularComponent implements OnInit {
  unidadcurricular!: UnidadCurricular;
  lstUnidadesCurriculares!: UnidadCurricular[];
  letunidades!: UnidadCurricular[];
  unidadX!: UnidadCurricular;
  letprevias!: Previa[];
  logueado!: string;
  loader!:boolean;

  semestre1: UnidadCurricular[] = [];
  semestre2: UnidadCurricular[] = [];
  semestre3: UnidadCurricular[] = [];
  semestre4: UnidadCurricular[] = [];
  semestre5: UnidadCurricular[] = [];
  semestre6: UnidadCurricular[] = [];
  

  constructor(protected unidadService:UnidadCurricularService,private route:Router, protected previaServ: PreviaService) { this.loader = true; }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }

  eliminar(index: number){
    if(confirm('Desea eliminar esta materia?')){
      this.unidadService.getAll().subscribe(
      (lst2)=>{
        this.letunidades = lst2;
        this.unidadX = this.letunidades[index];
        for (let previa of this.unidadX.previas){
          this.previaServ.delete(previa.previa.id).subscribe();
        }
        this.unidadService.delete(this.unidadX.id).subscribe();
        location.reload();
      })
    }    
  }

  editar(id: number){
    this.route.navigate(['/editarUnidad', id])
  }

  getUnidadCurricular(id:number){
     return this.unidadService.get(id);
   }

  cargarLista(){
    this.unidadService.getAll().subscribe(
      (lst)=>{
        this.lstUnidadesCurriculares = lst;
          for(let x of lst){
            if(x.semestre==1){
              this.semestre1.push(x);
            }
            if(x.semestre==2){
              this.semestre2.push(x);
            }
            if(x.semestre==3){
              this.semestre3.push(x);
            }
            if(x.semestre==4){
              this.semestre4.push(x);
            }
            if(x.semestre==5){
              this.semestre5.push(x);
            }
            if(x.semestre==6){
              this.semestre6.push(x);
            }
          }
          this.loader = false;
      }
    );
  }

  mandarID(index: number){
    this.unidadcurricular = this.lstUnidadesCurriculares[index];
    this.route.navigate(['/verPrevias', this.unidadcurricular.id]);
  }

  agregarPrevia(index: number){
    alert(index);
    this.unidadcurricular = this.lstUnidadesCurriculares[index];
    this.route.navigate(['/agregarPrevias', this.unidadcurricular.id]);
  }

}