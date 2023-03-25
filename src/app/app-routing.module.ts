import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

//Rutas principales (las que están importadas en el app.module.ts)
//Las demás rutas se cargarán "lazy load" (de manera perezosa), es decir, solo se cargarán cuando se necesiten
//Si hubiera colocado las demás rutas acá, se hubieran importado al inicio del proyecto
const routes: Routes = [
  {
    //Definimos el path de la ruta auth que se carga con "lazy load" (solo si se necesita)
    path: 'auth',
    //Acá defino que cuando alguien ingrese a "auth" se carguen sus rutas hijas
    //Tener en cuenta que en el loadChildren va el "módulo", que adicionalmente contiene el "routing" (y no directamente el routing)
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404' //Si escriben cualquier cosa en la ruta, redirige al ErrorPageComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //En nuestra app solo tenemos un UNICO "forRoot" (para las rutas principales)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
