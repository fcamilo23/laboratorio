import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { AltaNoticiaComponent } from './components/noticias/altaNoticia/alta-noticia/alta-noticia.component';
import { EditarNoticiaComponent } from './components/noticias/editar-noticia/editar-noticia.component';
const routes: Routes = [{path:'NavBar', component:NavbarComponent },
                        {path:'login', component:LoginComponent},
                        {path:'registro', component:RegistroComponent},
                        {path:'home', component:HomeComponent},
                        {path:'noticias', component:NoticiasComponent},
                        {path:'altaNoticia', component:AltaNoticiaComponent},
                        {path:'editarNoticia', component:EditarNoticiaComponent},







                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
