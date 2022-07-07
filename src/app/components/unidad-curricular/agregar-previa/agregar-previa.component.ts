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
  unidades: UnidadCurricular[] = [];
  letprevias!: Previa[];
  p!: Previa;
  letid: number = +this._router.snapshot.paramMap.get('id')!;
  tipo: string[] = [];
  unidad: number[] = [];

  unidadX!: UnidadCurricular;
  unidades2: UnidadCurricular[] = [];
  esta: boolean = false;

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
        this.unidades2 = lst1;
        for(let n of this.unidades2){
          if(n.id==this.letid){
            if(n.previas.length>0){
              for(let z of this.unidades2){
                for(let v of n.previas){
                  if(z.nombre==v.previa.nombre){
                    this.esta = true;
                  }      
                }
                if(z.nombre==n.nombre){
                  this.esta = true;
                } 
                if(this.esta==false){
                  this.unidades.push(z);
                }
                else{
                  this.esta = false;
                }
              }
            }else{
              for(let z of this.unidades2){
                if(z.nombre==n.nombre){
                  this.esta = true;
                } 
                if(this.esta==false){
                  this.unidades.push(z);
                }
                else{
                  this.esta = false;
                }
              }
            }
          }
        }
      }
    );
  }

  salir(){
    this.route.navigate(['/unidadCurricular']);
  }

  agregarPrevia(){
    alert(1);
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