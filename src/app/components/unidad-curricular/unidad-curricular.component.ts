import { Component, OnInit } from '@angular/core';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';

@Component({
  selector: 'app-unidad-curricular',
  templateUrl: './unidad-curricular.component.html',
  styleUrls: ['./unidad-curricular.component.css']
})
export class UnidadCurricularComponent implements OnInit {
  unidadcurricular!: UnidadCurricular;
  lstUnidadesCurriculares!: UnidadCurricular[];
  logueado!: string;

  constructor(protected unidadService:UnidadCurricularService) { }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }
  agregar(){

  }

  getUnidadCurricular(id:number){
     return this.unidadService.get(id);
   }

  cargarLista(){
    this.unidadService.getAll().subscribe(
      (lst)=>{
        this.lstUnidadesCurriculares = lst;
      }
    );
  }

  mandarID(index: number){
    this.unidadcurricular = this.lstUnidadesCurriculares[index];
    localStorage.setItem('unidadActual', JSON.stringify(this.unidadcurricular));
    window.location.href = ('/editarUnidad');
  }

}
