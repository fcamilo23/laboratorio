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
import { MateriasComponent } from './components/materias/materias.component';
import { AltaMateriaComponent } from './components/materias/alta-materia/alta-materia.component';
import { EditarMateriaComponent } from './components/materias/editar-materia/editar-materia.component';
import { UnidadCurricularComponent } from './components/unidad-curricular/unidad-curricular.component';
import { AltaUnidadComponent } from './components/unidad-curricular/alta-unidad/alta-unidad.component';
import { EditarUnidadComponent } from './components/unidad-curricular/editar-unidad/editar-unidad.component';
import { VerPreviasComponent } from './components/unidad-curricular/ver-previas/ver-previas.component';
import { ActivosComponent } from './components/Documentos/activos/activos.component';
import { ModificarComponent } from './components/Documentos/modificar/modificar.component';
import { NuevoComponent } from './components/Documentos/nuevo/nuevo.component';
import { HistorialComponent } from './components/Documentos/historial/historial.component';

const routes: Routes = [{path:'NavBar', component:NavbarComponent },
                        {path:'login', component:LoginComponent},
                        {path:'registro', component:RegistroComponent},
                        {path:'home', component:HomeComponent},
                        {path:'noticias', component:NoticiasComponent},
                        {path:'altaNoticia', component:AltaNoticiaComponent},
                        {path:'editarNoticia', component:EditarNoticiaComponent},
                        {path:'materias', component:MateriasComponent},
                        {path:'altaMateria', component:AltaMateriaComponent},
                        {path:'editarMateria', component:EditarMateriaComponent},
                        {path:'unidadCurricular', component:UnidadCurricularComponent},
                        {path:'editarUnidad', component:EditarUnidadComponent},
                        {path:'altaUnidad', component:AltaUnidadComponent},
                        {path:'verPrevias', component:VerPreviasComponent},
                        {path:'DocumentosActivos', component:ActivosComponent},
                        {path:'DocumentoModificar', component:ModificarComponent},
                        {path:'DocumentoNuevo', component:NuevoComponent},
                        {path:'DocumentoHistorial', component:HistorialComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
