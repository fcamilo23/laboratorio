import { FormControl, FormGroup } from '@angular/forms';
import { Documento } from './../../../clases/documento';
import { DocumentService } from './../../../service/document.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})
export class ActivosComponent implements OnInit {
  logueado: boolean=false;
  datint!:Documento[];
  infocar!:Documento[];
  oplab!:Documento[];
  loader!: boolean;

  public ViewDocForm:FormGroup = new FormGroup({
    tipo: new FormControl(''),
    idDoc: new FormControl('')
  });

  constructor(protected docser:DocumentService)  { this.loader=true;}

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if((x!=null)||(x==false)){
      this.logueado = true;
    }
    this.cargarLista();
  }

  cargarLista(){
    let ddi;
    let ic;
    let ol;
    this.docser.getAllActivas('DATOS_DE_INTERES').subscribe(
      (lst)=>{
        this.datint= lst;
        this.loader=false;

      }
    );
      this.docser.getAllActivas('INFORMACION_CARRERA').subscribe(
        (lst)=>{
          this.infocar=lst;
          this.loader=false;

        }
      );
      this.docser.getAllActivas('OPORTUNIDADES_LABORALES').subscribe(
        (lst)=>{
          this.oplab=lst;
          this.loader=false;

        }
      );
    }
    Editar(d:Documento){
      localStorage.setItem('idDocuActual', JSON.stringify(d.id));
      localStorage.setItem('documentoActual', JSON.stringify(d));
      window.location.href=('/DocumentoModificar')
    }
    showPdf(d:Documento){
      const downloadLink = document.createElement("a");
      const fileName = d.titulo+".pdf";
      downloadLink.href = d.documentoPDF;
      downloadLink.download = fileName;
      downloadLink.click();
}

}
