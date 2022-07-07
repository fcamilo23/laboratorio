import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Previa } from 'src/app/clases/previa';
import { PreviaSave } from 'src/app/clases/previaSave';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { PreviaService } from 'src/app/service/previa.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';

@Component({
  selector: 'app-agregar-previa',
  templateUrl: './agregar-previa.component.html',
  styleUrls: ['./agregar-previa.component.css']
})
export class AgregarPreviaComponent implements OnInit {


  public previasForm: FormGroup = new FormGroup({
    unidad: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  logueado!: string;
  unidades!: UnidadCurricular[];
  letprevias!: Previa[];
  p!: Previa;
  letid: number = +this._router.snapshot.paramMap.get('id')!;
  tipo: string[] = [];
  unidad: number[] = [];

  constructor(protected previasService: PreviaService, protected unidadService:UnidadCurricularService, private _router: ActivatedRoute,private route:Router) { }

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

  salir(){
    this.route.navigate(['/unidadCurricular']);
  }

  agregarPrevia(){
    let unidadZ = this.previasForm.controls['unidad'].value;
    let tipoZ = this.previasForm.controls['tipo'].value;

      for(let z of this.unidades){
        if(z.id==+unidadZ)
        {
          let pos = this.unidades.indexOf(z);
          this.unidades.splice(pos, 1);
        }
      }
      let previa = new PreviaSave(this.letid,+unidadZ,tipoZ);
      alert(JSON.stringify(previa));
      this.previasService.create(previa).subscribe();
  }
}
