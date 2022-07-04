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
  
  public aux!: string[];
  unidadC!: String;
  previa!: string;
  tipo!: string;
  letPrevias!: Previa[];
  public unidad!: UnidadCurricular;
  letId!: number;

  constructor(protected previasService: PreviaService, protected unidadService:UnidadCurricularService, private router:Router, private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this.letId = +this._router.snapshot.paramMap.get('id')!;
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }

    //implementar una guarda para chekear el usuario logueado y si no esta que redirija al login
    //rotear con id en url para obtener en otra pagina

    this.unidadService.get(this.letId).subscribe(
      (lst)=> {
        this.unidad = lst; 
        this.letPrevias = this.unidad.previas;
        //alert(JSON.stringify(JSON.stringify(this.letPrevias[0]['previa']))[0]['nombre']);
      }
    );
  }


  eliminar(id: string){

  }
}
