import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root' //Como el servicio está proveeido en el root, es global, lo puedo usar en cualquier otro módulo sólo inyectándolo
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  get auth(): Auth {
    return { ...this._auth! };
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      );
  }

  logout() {
    this._auth = undefined;
  }

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false); //of es un operador de rxjs que devuelve el valor en un Observable (en el ejemplo devuelve un "false" dentro de un Observable)
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        //El "map" transforma el operador anterior por lo que desee y retorna el nuevo valor
        map(auth => {
          this._auth = auth;
          return true;
        })
      );
  }
}
