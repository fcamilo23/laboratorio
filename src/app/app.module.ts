import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import { AuthInterceptor } from './auth-interceptor.service';
import { AltaNoticiaComponent } from './components/noticias/altaNoticia/alta-noticia/alta-noticia.component';
import { EditarNoticiaComponent } from './components/noticias/editar-noticia/editar-noticia.component';
import { CarouselService } from './service/carousel.service';
import { MateriasComponent } from './components/materias/materias.component';
import { AltaMateriaComponent } from './components/materias/alta-materia/alta-materia.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NoticiasComponent,
    AltaNoticiaComponent,
    EditarNoticiaComponent,
    MateriasComponent,
    AltaMateriaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    CarouselModule
  ],
  providers: [CarouselService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
