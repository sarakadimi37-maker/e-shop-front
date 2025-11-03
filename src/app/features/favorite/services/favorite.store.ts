import {Injectable, signal} from '@angular/core';
import {Product} from '../../../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStore {

  favorites = signal<Product[]>([]);

  clearFavorites() {
    this.favorites.set([]);
  }


}
