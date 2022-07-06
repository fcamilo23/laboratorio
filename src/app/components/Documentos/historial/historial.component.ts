import { DocumentService } from './../../../service/document.service';
import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/app/clases/documento';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historia: Documento[]=[];
  page=1;
  largo!:number;
  logueado=false;

  constructor(protected docser:DocumentService) { }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if((x!=null)||(x==false)){
      this.logueado = true;
    }
    this.cargarLista();
  }

  cargarLista(){
    this.docser.Historial(0).subscribe(
      (lst)=>{
        this.historia= lst.list;
      })
  }
  anterior(){
    if(this.page-1>0){this.page=this.page-1;}

    this.docser.Historial(this.page-1).subscribe(
      (lst)=>{
        this.historia= lst.list;
      })
  }
  posterior(){
    this.docser.Historial(this.page).subscribe(
      (lst)=>{
        this.historia= lst.list;
      })
      if (this.historia==null){
        this.docser.Historial(this.page-1).subscribe(
          (lst)=>{
            this.historia= lst.list;
          })
      }else{
        this.page=this.page+1;
      }

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
