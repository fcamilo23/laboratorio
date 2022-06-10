import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  items: MenuItem[]=[];
  ngOnInit(): void {
    this.items = [
      {
        label: 'IniciarSesion',
        icon: 'pi pi-fw pi-sign-in',
      },
      {
          label: 'Secciones',
          icon: 'pi pi-fw pi-list',
          items: [
              {label: 'Noticias', icon: 'pi pi-fw pi-info-circle'},
              {label: 'Documentos', icon: 'pi pi-fw pi-file'}
          ]
      }
  ];
  }

}
