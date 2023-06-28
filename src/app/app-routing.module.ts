import { NgModule, Component } from '@angular/core';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { HomePageComponent } from './shared/pages/homePage/homePage.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';


const routes: Routes = [
  // Ruta para ir al home
  {
    path: '',
    component: HomePageComponent
  },
  // Ruta para ir al about
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  //cualquiera ruta que no sean las existente nos redirigiran al home
  {
    path: '**',
    redirectTo: ''
  },


];

@NgModule({

  imports: [
    // el forRoot se usa cuando es la ruta principal, la que se encuentra en la carpeta raiz, si usas otras rutas en otros componentes
    //que no sea esta principal, sera un forChild
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})


export class AppRoutingModule { }

