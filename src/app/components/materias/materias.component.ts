import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/clases/materia';
import { MateriaService } from 'src/app/service/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})

export class MateriasComponent implements OnInit {

  materia!: Materia;
  lstMaterias!: Materia[];
  logueado!: string;

  constructor(protected materiaService: MateriaService) { }

  ngOnInit(): void {
    let x = localStorage.getItem('logueado');
    if(x!=null){
      this.logueado = x;
    }
    this.cargarLista();
  }


  cargarLista(){
    this.materiaService.getAll().subscribe(
      (lst1)=>{
        this.lstMaterias = lst1;
      }
    );
  }
}
