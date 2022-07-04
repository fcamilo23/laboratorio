import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Previa } from 'src/app/clases/previa';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { PreviaService } from 'src/app/service/previa.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unidad-curricular',
  templateUrl: './unidad-curricular.component.html',
  styleUrls: ['./unidad-curricular.component.css'],
})
export class UnidadCurricularComponent implements OnInit {
  lstUnidadesCurriculares!: UnidadCurricular[];
  logueado!: string;
  letPrevias!: Previa[];

  constructor(protected unidadService:UnidadCurricularService, protected previaService:PreviaService, private router:Router){ }
  public unidadForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }

  getUnidadCurricular(id:number){
     return this.unidadService.get(id);
   }

  cargarLista(){
    this.unidadService.getAll().subscribe(
      (lst: any)=>{
        this.lstUnidadesCurriculares = lst;
        this.letPrevias = lst.values;
      }
    );
  }

  mandarID(id: number){
    this.router.navigate(['/verPrevias', id]);
  }

  agregar(){
    this.router.navigate(['/altaUnidad']);
  }

}
