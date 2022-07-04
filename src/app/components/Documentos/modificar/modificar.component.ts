import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Documento } from 'src/app/clases/documento';
import { DocumentService } from 'src/app/service/document.service';

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
    tipo: new FormControl('')
    });;
  messageService: any;
  constructor(protected docuserv:DocumentService) {

  }

  ngOnInit(): void {
        this.docu= JSON.parse(localStorage.getItem("documentoActual") || '{}');
        this.tipos=['INFORMACION_CARRERA', 'OPORTUNIDADES_LABORALES', 'DATOS_DE_INTERES'];
        this.modificarDocForm.controls['titulo'].setValue(this.docu.titulo);
        this.modificarDocForm.controls['tipo'].setValue(this.docu.tipo);
  }

 Modificar(){
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
      alert('Se ha Modificado la noticia correctamente');
      window.location.href = ('/DocumentosActivos');
    }else{
      alert('Ha ocurrido un error');
    }
    }else{
      alert('Debe estar logueado para realizar esta accion');
    }
 }
 Baja(){
  if(localStorage.getItem('logueado') == '1'){
    let id= JSON.parse(localStorage.getItem("idDocuActual") || '{}');
    let d = new Documento(this.docu.titulo,this.docu.tipo,this.docu.documentoPDF);
    d.id=id;
    d.activo=false;
    if (this.docuserv.Modificar(id,d).subscribe()){
      alert('Se ha Modificado la noticia correctamente');
      window.location.href = ('/DocumentosActivos');
    }else{    alert('Ha ocurrido un error');
  }
  }else{
    alert('Debe estar logueado para realizar esta accion');
  }
  }
  cancelar(){
    window.location.href = ('/DocumentosActivos');
  }
 }


