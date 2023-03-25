import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router) { }

  canLoad(//Restringe la carga inicial del componente
          //Tener en cuenta que si por alguna razón se cargó el componente y se encuentra en memoria, el guard no va a impedir que se visualice (porque ya está cargado)
          //Para asegurarme debo complementarlo con el "canActivate"
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigate(['./auth/login']);
            }
          })
        );

      // if (this.authService.auth.id) {
      // return true;
      // }

      // console.log('Bloqueado por el AuthGuard - canLoad');
      // return false;
  }

  canActivate(//Restringe la activación del componente
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigate(['./auth/login']);
            }
          })
        );

      // if (this.authService.auth.id) {
      // return true;
      // }
  
      // console.log('Bloqueado por el AuthGuard - canActivate');
      // return false;
  }
  

}
