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

  eliminar(id: number){
    if(confirm('Desea eliminar esta materia?')){
      this.unidadService.getAll().subscribe(
      (lst2)=>{
        this.letunidades = lst2;
        for(let x of this.lstUnidadesCurriculares){
          if(x.id==id){
            this.unidadX = x;
          }
        }
        if(this.unidadX.previas.length>0){
          alert("entra");
          for (let previa of this.unidadX.previas){
            alert("entra2");
            this.previaServ.delete(previa.previa.id).subscribe();
          }
          alert("sale");
        }
        this.unidadService.delete(id).subscribe();
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
    this.route.navigate(['/verPrevias', index]);
  }

  agregarPrevia(index: number){
    this.route.navigate(['/agregarPrevias', index]);
  }

}