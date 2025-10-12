import { Component } from '@angular/core';
import {Counter} from '../../products/components/counter/counter';
import {Temperature} from '../../products/components/temperature/temperature';
import {LikeCounter} from '../../products/components/like-counter/like-counter';

@Component({
  selector: 'app-home.page',
  imports: [
    Counter,
    Temperature,
    LikeCounter
  ],
  template: `
    <p>------  Affichage de composant Counter  -------</p>
    <app-counter></app-counter>
    <p>------  Affichage de composant Température  -------</p>
    <app-temperature></app-temperature>
    <p>------  Affichage de composant Like Counter  -------</p>
    <app-like-counter></app-like-counter>
  `,
  styles: ``
})
export class HomePage {

}
