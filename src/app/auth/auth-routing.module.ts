import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

//Defino las rutas de "auth" que se cargarán "lazy load" (solo cuando se necesiten)
const routes: Routes = [
  {
    path: '', //Ruta raíz, cada vez que entre a este módulo, se ingresa a esta ruta...
    children: [ //Rutas hijas
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]

@NgModule({
  imports: [
    //En nuestra app solo tenemos un UNICO "forRoot" (para las rutas principales), en app-routing.module.ts
    //Por eso acá usamos "forChild" (para rutas hijas) que son cargadas con "lazy load"
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
