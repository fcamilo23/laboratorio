import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { MateriaService } from 'src/app/service/materias.service';
import { PreviaService } from 'src/app/service/previa.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements OnInit {

  materia!: Materia;
  lstMaterias!: Materia[];
  lstUnidades!: UnidadCurricular[];
  logueado!: string;
  materiaActual!: Materia;
  loader!: boolean;

  constructor(protected materiaService: MateriaService, protected unidadService: UnidadCurricularService, protected previaService: PreviaService, protected router:Router) { this.loader=true;}

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }

  abrirEditar(index:number){
    this.materiaActual = this.lstMaterias[index];
    localStorage.setItem('materiaActual', JSON.stringify(this.materiaActual));
  }

   eliminar(id: number){


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
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
      this.unidadService.getAll().subscribe(
        (lst2)=>{
          this.lstUnidades = lst2;
          for (let unidad of this.lstUnidades){
            if(unidad.materia.id==this.materia.id){
               if(unidad.previas.length>0){
                for (let previa of unidad.previas){
                  this.previaService. delete(previa.previa.id).subscribe();
                }
              }
              this.unidadService.delete(unidad.id).subscribe();
            }
          }
      });

      
    this.materiaService.delete(id).subscribe();
        swal.fire(
          'Eliminado!',
          'La materia ha sido eliminada',
          'success'
        )
        this.router.navigate(['/materias'])
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
  
    
  }

  cargarLista(){
    this.materiaService.getAll().subscribe(
      (lst1)=>{
        this.lstMaterias = lst1;
        this.loader=false;

      }
    );
  }
}
