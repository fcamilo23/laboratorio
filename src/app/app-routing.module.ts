import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [{path:'NavBar', component:NavbarComponent },
                        {path:'Carrusel', component:CarruselComponent},
                        {path:'login', component:LoginComponent},

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
