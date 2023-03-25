import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root' //Se provee en el "root" por lo que no hace falta importarlo en otro lado...
  //Si quisiera cargarlo solo en el módulo "heroes.module.ts", deberia hacer el providedIn ahí.
  //Pero no tiene sentido, ya que la carga en root es con lazy load, así que es más fácil dejarlo así como viene por defecto
  //
  //Otra cosa a tener en cuenta...como el servicio está global (al proveerse en root),
  //entonces si requiero importar algún módulo, debo hacerlo en el app.module.ts (modulo global)
})
export class HeroesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroesById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${id}`);
  }
}
