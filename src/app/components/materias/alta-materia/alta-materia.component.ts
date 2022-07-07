import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { MateriaService } from 'src/app/service/materias.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.css']
})

export class AltaMateriaComponent implements OnInit {

  public altaMateriaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    creditosminimos: new FormControl('', [Validators.required]),
  });

  constructor(protected materiaServ:MateriaService, private _router: ActivatedRoute, private rout: Router) { }
  ngOnInit(): void {

  }

  addNoticia(){
    let nombre = this.altaMateriaForm.controls['nombre'].value;
    let descripcion = this.altaMateriaForm.controls['descripcion'].value;
    let creditosminimos = this.altaMateriaForm.controls['creditosminimos'].value;


    let m = new Materia(0, nombre, descripcion, creditosminimos);
    if(this.materiaServ.create(m).subscribe()){
      swal.fire('Listo!','Se ha agregado la materia correctamente','success');
      this.rout.navigate(['/materias']);

    }else{
      swal.fire('Error!','','error');

    }


  }

  }


