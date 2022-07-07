import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Documento } from 'src/app/clases/documento';
import { DocumentService } from 'src/app/service/document.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  docu!:Documento;
  tipos!: string [];
  tipoSeleccionado:string="";
  uploadedFiles: any[] = [];
  public modificarDocForm:FormGroup = new FormGroup({
    titulo: new FormControl(''),
    tipo: new FormControl(''),
    });;
  messageService: any;
  constructor(protected docuserv:DocumentService, protected router:Router) {

  }

  ngOnInit(): void {
        this.docu= JSON.parse(localStorage.getItem("documentoActual") || '{}');
        this.tipos=['INFORMACION_CARRERA', 'OPORTUNIDADES_LABORALES', 'DATOS_DE_INTERES'];
        this.modificarDocForm.controls['titulo'].setValue(this.docu.titulo);
        this.modificarDocForm.controls['tipo'].setValue(this.docu.tipo);
  }


  Modificar(){



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
       
    if(localStorage.getItem('logueado') == '1'){
      let id= JSON.parse(localStorage.getItem("idDocuActual") || '{}');
      let t:string="";
      let tip:string="";
      let doc:string="";
      t=t+this.modificarDocForm.get('titulo')!.value;
      tip=tip+this.modificarDocForm.get('tipo')!.value;
      let d= new Documento(t,tip,doc);
      d.id=id;
      if (this.docuserv.Modificar(id,d).subscribe()){
        swal.fire('Listo!','Se ha modificado el documento correctamente','success')
        this.router.navigate(['/DocumentosActivos']);
      }else{
        swal.fire('Error!','','error');
      }
      }else{
        swal.fire('Error!','Debe estar logueado para realizar esta accion','error');
        
      }
  
        swal.fire(
          'Listo!',
          'Se han guardado los cambios',
          'success'
        )
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
   Baja(){
  
  
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
        if(localStorage.getItem('logueado') == '1'){
          let id= JSON.parse(localStorage.getItem("idDocuActual") || '{}');
          let d = new Documento(this.docu.titulo,this.docu.tipo,this.docu.documentoPDF);
          d.id=id;
          d.activo=false;
          if (this.docuserv.Modificar(id,d).subscribe()){
            swal.fire('Listo!','Se ha eliminado el documento correctamente','success')
            this.router.navigate(['/DocumentosActivos']);
          }else{          swal.fire('Error!','','error')
      
        }
        }else{
          swal.fire('Error!','Debe estar logueado para realizar esta accion','error');
        }
  
        swal.fire(
          'Eliminado!',
          'La noticia ha sido eliminada',
          'success'
        )
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
  cancelar(){
    window.location.href = ('/DocumentosActivos');
  }
  Alta(){
    if(localStorage.getItem('logueado') == '1'){
      let id= JSON.parse(localStorage.getItem("idDocuActual") || '{}');
      let t:string="";
      let tip:string="";
      let doc:string="";
      t=t+this.modificarDocForm.get('titulo')!.value;
      tip=tip+this.modificarDocForm.get('tipo')!.value;
      let d= new Documento(t,tip,doc);
      d.id=id;
      if (this.docuserv.Modificar(id,d).subscribe()){
        swal.fire('Listo!', 'Se ha modificado el documento correctamente', 'success');
        this.router.navigate(['/DocumentosActivos']);
      }else{
        alert('Ha ocurrido un error');
      }
      }else{
        alert('Debe estar logueado para realizar esta accion');
      }
  }
 }


