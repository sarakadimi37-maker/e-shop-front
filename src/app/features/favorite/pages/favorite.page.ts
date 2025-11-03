import { Component } from '@angular/core';
import {Favorite} from '../components/favorite';

@Component({
  selector: 'app-favorite.page',
  imports: [
    Favorite
  ],
  template: `
    <app-favorite></app-favorite>
  `,
  styles: ``,
})
export default class FavoritePage {

}
