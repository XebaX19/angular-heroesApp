import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private route: ActivatedRoute, 
              private heroesService: HeroesService,
              private router: Router) { }

  ngOnInit(): void {

    // this.route.params.subscribe(({ id }) => {
    //   console.log(id);
    // });
    //Otra forma de hacer lo anterior...
    //console.log(this.route.snapshot.params['id']);

    //Obtengo el id de la ruta y luego llamo al servicio para recuperar el objeto Heroe con ese id
    this.route.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroesById(id) )
      )
      .subscribe(heroe => this.heroe = heroe)
  }

  regresar() {
    this.router.navigate(['heroes/listado']);
  }
}
