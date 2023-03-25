import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //Pipe puro o impuro:
  //por defecto es pure = true, quiere decir que solo se invoca el transform si cambia el argumento (o sea , el value Heroe)
  //si lo seteo pure = false, se va a invocar el transform si cambia el argumento y además si cambia alguna propiedad del argumento actual
  //  TENER EN CUENTA que el pipe impuro consume más recursos, usarlo con precaución...
  pure: true
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe): string {
    if (!value.id && !value.alt_image) {
      return `assets/no-image.png`;
    } else if(value.alt_image) {
      return value.alt_image;
    } else {
      return `assets/heroes/${value.id}.jpg`;
    }
  }
}
