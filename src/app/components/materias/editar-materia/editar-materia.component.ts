import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Materia } from 'src/app/clases/materia';
import { MateriaService } from 'src/app/service/materias.service';

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
  
  constructor(protected materiaService: MateriaService) { }

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
        if(confirm("Desea guardar los cambios realizados?")){
          this.materiaService.edit(this.materia).subscribe();
          alert("Se han guardado los cambios exitosamnete!");
          window.location.href = ('/noticias');
      }
      }else{
        alert('Debe estar logueado para realizar esta accion');
      }
    }else{
      alert('No pueden quedar campos vacios');
    }
  }
}
