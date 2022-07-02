import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  private estalog = false;
  log(){
    var logueado = localStorage.getItem("logueado");
    if(logueado == '0'){
       this.estalog = false;
    }else if(logueado == '1'){
      this.estalog = true;
    }

    
  }

  logout(){
    localStorage.setItem('logueado', JSON.stringify(0));
    location.reload();

  }

  items: MenuItem[]=[];
  ngOnInit(): void {
    this.log();
    if(this.estalog == false){
    this.items = [
      
      {
        label: 'Iniciar Sesion',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/login',

      },
      {
          label: 'Secciones',
          icon: 'pi pi-fw pi-list',
          items: [
              {label: 'Noticias', icon: 'pi pi-fw pi-info-circle', routerLink: '/noticias'}, 
              {label: 'Documentos', icon: 'pi pi-fw pi-file', routerLink:'/DocumentosActivos'},
              {label: 'Materias', icon: 'pi pi-fw pi-file',routerLink: '/materias'},
              {label: 'Unidades', icon: 'pi pi-fw pi-file',routerLink: '/unidadCurricular'}

          ]
      }
  ];
}else{ 
  this.items = [
      
  {
    label: 'Cerrar Sesion',
    icon: 'pi pi-fw pi-sign-in',
    routerLink: '/home',
    command: this.logout
  },
  {
      label: 'Secciones',
      icon: 'pi pi-fw pi-list',
      items: [
          {label: 'Noticias', icon: 'pi pi-fw pi-info-circle', routerLink: '/noticias'}, 
          {label: 'Documentos', icon: 'pi pi-fw pi-file', routerLink:'/DocumentosActivos'},
          {label: 'Materias', icon: 'pi pi-fw pi-file',routerLink: '/materias'},
          {label: 'Unidades', icon: 'pi pi-fw pi-file',routerLink: '/unidadCurricular'}

      ]
  }
];

}
  }

}
