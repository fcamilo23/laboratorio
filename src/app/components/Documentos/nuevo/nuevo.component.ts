import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Documento } from 'src/app/clases/documento';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  tipos!: string [];
  tipoSeleccionado:string="";
  uploadedFiles: any[] = [];
  public createDocForm:FormGroup = new FormGroup({
    titulo: new FormControl(''),
    tipo: new FormControl(''),
    documento:new FormControl('')
  });
  messageService: any;
  constructor(protected docuserv:DocumentService) {
  }

  ngOnInit(): void {
    this.tipos=['INFORMACION_CARRERA', 'OPORTUNIDADES_LABORALES', 'DATOS_DE_INTERES'];
  }

 subir(){
  if(localStorage.getItem('logueado') == '1'){
  let t:string="";
  let tip:string="";
  let doc:string="";
  t=t+this.createDocForm.get('titulo')!.value;
  tip=tip+this.createDocForm.get('tipo')!.value;
  doc=doc+this.createDocForm.get('documento')!.value;
  let d= new Documento(t,tip,doc);
  if (this.docuserv.altaDocumento(d).subscribe()){
    alert('Se ha agregado la noticia correctamente');
    window.location.href = ('/DocumentosActivos');
  }else{
    alert('Ha ocurrido un error');
  }
  }else{
    alert('Debe estar logueado para realizar esta accion');
  }
 }
 alCargarDocumento(evt: any) {
  const archivo = evt.target.files[0];

  // Si realmente se cargo un archivo
  if (archivo) {
    const lector = new FileReader();

    lector.onload = this.obtenerStringDocumento.bind(this);
    lector.readAsBinaryString(archivo);
    // OJO que el string con la imagen demora unos milisegundos en cargarse
  }else{
    // aca no se como hacer que entre, pero por las dudas le pongo esto...
    this.createDocForm.controls['documento'].setValue("");
  }
}
obtenerStringDocumento(e:any) {
  let strImg = "data:application/pdf;base64," + btoa(e.target.result);
  this.createDocForm.controls['documento'].setValue(strImg);
}
}
