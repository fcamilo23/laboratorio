import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { Previa } from 'src/app/clases/previa';
import { PreviaSave } from 'src/app/clases/previaSave';
import { UnidadCurricular } from 'src/app/clases/unidadCurricular';
import { MateriaService } from 'src/app/service/materias.service';
import { PreviaService } from 'src/app/service/previa.service';
import { UnidadCurricularService } from 'src/app/service/unidad-curricular.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-unidad',
  templateUrl: './editar-unidad.component.html',
  styleUrls: ['./editar-unidad.component.css']
})
export class EditarUnidadComponent implements OnInit {

  public editUnidadForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    creditos: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.required]),
    materia: new FormControl('', [Validators.required]),
  });

  materiaX!: Materia;
  previas: Previa[] = [];
  letMaterias!: Materia[];
  logueado!: string;
  strImg!: string;
  letUnidades!: UnidadCurricular[];
  previaX!: PreviaSave;
  unidadX!: UnidadCurricular;
  letID: number = +this._router.snapshot.paramMap.get('id')!;

  constructor(protected materiaServi:MateriaService, protected uniServ:UnidadCurricularService, private router:Router, protected previaSer: PreviaService, private _router: ActivatedRoute) { }
  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }

  cargarLista(){
    this.materiaServi.getAll().subscribe(
      (lst1)=>{
        this.letMaterias = lst1;
      }
    );

    this.uniServ.getAll().subscribe(
      (lst)=>{
        this.letUnidades = lst;
        for(let x of lst){
          if(x.id==this.letID){
            this.unidadX = x;
          }
        }
        this.materiaX = this.unidadX.materia;
        this.editUnidadForm.controls['nombre'].setValue(this.unidadX.nombre);
        this.editUnidadForm.controls['descripcion'].setValue(this.unidadX.descripcion);
        this.editUnidadForm.controls['creditos'].setValue(this.unidadX.creditos);
        this.editUnidadForm.controls['semestre'].setValue(this.unidadX.semestre);
        this.editUnidadForm.controls['materia'].setValue(this.materiaX.nombre);
      }
    );
  }

  alCargarDocumento(evt: any) {
    const archivo = evt.target.files[0];
  
    if (archivo) {
      const lector = new FileReader();
      lector.onload = this.obtenerStringDocumento.bind(this);
      lector.readAsBinaryString(archivo);
    }else{
      this.editUnidadForm.controls['documento'].setValue("");
    }
  }

  obtenerStringDocumento(e:any) {
    this.strImg = "data:application/pdf;base64," + btoa(e.target.result);
    this.editUnidadForm.controls['documento'].setValue(this.strImg);
  }

  buscarMateria(nombre: string){
    for(let x of this.letMaterias){
      if(x.nombre==nombre){
        this.materiaX = x;
      }
    }
  }

  editar(){
    if(this.editUnidadForm.controls['nombre'].value != "" && this.editUnidadForm.controls['descripcion'].value != "" && this.editUnidadForm.controls['creditos'].value != ""){
  
      let nombre = this.editUnidadForm.controls['nombre'].value;
      let descripcion = this.editUnidadForm.controls['descripcion'].value;
      let creditos = this.editUnidadForm.controls['creditos'].value;
      let semestre = this.editUnidadForm.controls['semestre'].value;
      let materia = this.editUnidadForm.controls['materia'].value; 
      let documento = this.editUnidadForm.controls['documento'].value; 

      if(materia!=this.materiaX.nombre)
        this.buscarMateria(materia);
      if(documento=="")
        this.strImg = this.unidadX.documento;        
     
      let n = new UnidadCurricular(this.unidadX.id,nombre,descripcion,+creditos,this.strImg,+semestre,this.materiaX,this.unidadX.previas);
      
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn1 btn-success',
          cancelButton: 'btn1 btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar cambios!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          if(localStorage.getItem('logueado') == '1'){
            this.uniServ.edit(n).subscribe();
            this.router.navigate(['/unidadCurricular']);
            swalWithBootstrapButtons.fire(
              'Perfecto!',
              'Los cambios han sido guardados',
              'success'
            )
            this.router.navigate(['/unidadCurricular']);
        
        }else{
          swalWithBootstrapButtons.fire(
            'Error!',
            'Debe estar logueado para realizar esta accion',
            'error'
          );
        }
  
         

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Todo sigue como estaba!',
            'error'
          )
        }
      })





      
    }else{
      alert('No pueden quedar campos vacios');
    }
  }

}