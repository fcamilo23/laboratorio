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
  docu:Documento=this.docuserv.docuselect;
  tipos!: string [];
  tipoSeleccionado:string="";
  uploadedFiles: any[] = [];
  public modificarDocForm:FormGroup = new FormGroup({
    titulo: new FormControl(this.docu.titulo),
    tipo: new FormControl(this.docu.tipo)
    });
  messageService: any;
  constructor(protected docuserv:DocumentService) {
    this.docu=this.docuserv.docuselect;
  }

  ngOnInit(): void {
        this.tipos=['INFORMACION_CARRERA', 'OPORTUNIDADES_LABORALES', 'DATOS_DE_INTERES'];
  }

 Modificar(){
  if(localStorage.getItem('logueado') == '1'){
  let t:string="";
  let tip:string="";
  let doc:string="";
  t=t+this.modificarDocForm.get('titulo')!.value;
  tip=tip+this.modificarDocForm.get('tipo')!.value;
  let d= new Documento(t,tip,doc);
  if (this.docuserv.Modificar(this.docuserv.docuselect.id,d).subscribe()){
    alert('Se ha Modificado la noticia correctamente');
    window.location.href = ('/DocumentosActivos');
  }else{
    alert('Ha ocurrido un error');
  }
  }else{
    alert('Debe estar logueado para realizar esta accion');
  }
 }

}
