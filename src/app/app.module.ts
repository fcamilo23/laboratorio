import { NgModule, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './navbar/navbar.component';
import { CarruselComponent } from './carrusel/carrusel.component'
import { HttpClientModule } from '@angular/common/http';
import { FormNoticiaComponent } from './form-noticia/form-noticia.component';
import { VerNoticiasComponent } from './ver-noticias/ver-noticias.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarruselComponent,
    FormNoticiaComponent,
    VerNoticiasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
