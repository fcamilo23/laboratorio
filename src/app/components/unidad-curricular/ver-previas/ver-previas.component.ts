import { Component, OnInit } from '@angular/core';
import { Previa } from 'src/app/clases/previa';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { PreviaService } from 'src/app/service/previa.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';

@Component({
  selector: 'app-ver-previas',
  templateUrl: './ver-previas.component.html',
  styleUrls: ['./ver-previas.component.css']
})
export class VerPreviasComponent implements OnInit {

  logueado!: string;
  unidades!: UnidadCurricular[];
  letid = Number(localStorage.getItem('idUnidadCurricular'));
  letprevias!: Previa[];
  unidad!: UnidadCurricular;
  p!: Previa;

  constructor(protected previasService: PreviaService, protected unidadService:UnidadCurricularService) { }

  ngOnInit(): void {
    /*this.p.unidadCurricular=101;
    this.p.previa = 207;
    this.p.tipo = "Examen";

    this.previasService.create(this.p).subscribe();

    this.unidad = JSON.parse(localStorage.getItem("unidadActual") || '{}');
    this.unidad.previas.push(this.p);

    this.unidadService.edit(this.unidad);
    alert(this.unidad.previas);*/
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    
    this.letprevias = this.unidades[this.letid].previas;

    alert();
  }

  cargarUnidades(){
    this.unidadService.getAll().subscribe(
      (lst1)=>{
        this.unidades = lst1;
      }
    );
  }

  eliminar(id: number){

  }
}
