import { FormNoticiaComponent } from './form-noticia/form-noticia.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { VerNoticiasComponent } from './ver-noticias/ver-noticias.component';
const routes: Routes = [{path:'NavBar', component:NavbarComponent },
                        {path:'Carrusel', component:CarruselComponent},
                        {path:'FormNoticia',component:FormNoticiaComponent},
                        {path:'VerNoticia', component:VerNoticiasComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
