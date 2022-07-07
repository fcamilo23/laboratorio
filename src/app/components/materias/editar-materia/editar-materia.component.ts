import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { MateriaService } from 'src/app/service/materias.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {

  public editMateriaForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    creditos: new FormControl('', [Validators.required]),
  });

  materia!: Materia;
  
  constructor(protected materiaService: MateriaService, protected router:Router) { }

  ngOnInit(): void {
    
    this.cargarDatos();
  }

  cargarDatos(){
    this.materia = JSON.parse(localStorage.getItem("materiaActual") || '{}');
    this.editMateriaForm.controls['nombre'].setValue(this.materia.nombre);
    this.editMateriaForm.controls['descripcion'].setValue(this.materia.descripcion);
    this.editMateriaForm.controls['creditos'].setValue(this.materia.creditosMinimos);
  }

  editar(){


    if(this.editMateriaForm.controls['nombre'].value != "" && this.editMateriaForm.controls['descripcion'].value != "" && this.editMateriaForm.controls['creditos'].value != ""){
      this.materia.nombre =  this.editMateriaForm.controls['nombre'].value;
      this.materia.descripcion =  this.editMateriaForm.controls['descripcion'].value;
      this.materia.creditosMinimos =  this.editMateriaForm.controls['creditos'].value;
      
      if(localStorage.getItem('logueado') == '1'){

    const Swal = swal.mixin({
      customClass: {
        confirmButton: 'btn1 btn-success',
        cancelButton: 'btn1 btn-danger'
      },
      buttonsStyling: false
    })
    
    swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar cambios!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
       
    
        this.materiaService.edit(this.materia).subscribe();
  
        swal.fire(
          'Listo!',
          'Se han guardado los cambios',
          'success'
        )
        this.router.navigate(['/materias']);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelado',
          'Todo sigue como estaba!',
          'error'
        )
      }
    })

  }else{
    swal.fire(
      'Error!',
      'Debe estar logueado para realizar esta accion',
      'error'
    )
  }
   
    }else{
      swal.fire(
        'Error!',
        'No pueden quedar campos vacios',
        'error'
      )
    }
  }
}
