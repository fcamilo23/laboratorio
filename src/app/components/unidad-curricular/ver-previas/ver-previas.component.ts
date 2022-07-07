import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  letprevias!: Previa[];
  unidad!: UnidadCurricular;
  p!: Previa;
  letid: number = +this._router.snapshot.paramMap.get('id')!;

  constructor(protected previasService: PreviaService, protected unidadService:UnidadCurricularService, private _router: ActivatedRoute, private rout: Router) { }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }

    this.cargarUnidades();
  }

  cargarUnidades(){
    this.unidadService.getAll().subscribe(
      (lst1)=>{
        this.unidades = lst1;
        for(let n of this.unidades){
          if(n.id==this.letid){
            this.letprevias = n.previas;
          }
        }
      }
    );
  }

  eliminar(index: number){
    alert("llegamos"+index)
    this.previasService.delete(this.letprevias[index].id).subscribe();
    this.rout.navigate(['/verPrevias', +this.letid]);
  }
}
