import {inject, Injectable} from '@angular/core';
import {FavoriteApi} from './favorite.api';
import {FavoriteStore} from './favorite.store';
import {Product} from '../../../models/product-model';
import {NotificationService} from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFacade {

  favoriteApi = inject(FavoriteApi);
  favoriteStore = inject(FavoriteStore);
  notificationService = inject(NotificationService);

  async loadFavorite() {
    const myFavorites= await this.favoriteApi.getFavorites();
    this.favoriteStore.favorites.update((favoriteProducts)=>{
      // cet 2 ligne en sous present la me logic mais de syntax different
      //return favoriteProducts.concat(myFavorites);
      return [...favoriteProducts, ...myFavorites];
    });
  }

  clearProductsInFavorites() {
    this.favoriteStore.favorites().forEach(async (favorite) => {
      await this.favoriteApi.deleteFavorite(favorite.id);
    });
    this.favoriteStore.clearFavorites();
    this.notificationService.showSuccess("Votre liste des produits en favori a été vider avec succès.");
  }

  async onProductAddedToFavorite(product: Product): Promise<void> {
    this.favoriteStore.favorites.update((products)=> [...products, product]);
    await this.favoriteApi.createFavorite(product.id);
  }

  async onProductRemoveFromFavorite(product: Product): Promise<void> {
    // this.favoriteIds = this.favoriteIds.filter(id => id !== product.id);
    await this.favoriteApi.deleteFavorite(product.id);

    this.favoriteStore.favorites.update((products)=> products
      .filter(p => p.id !== product.id));
  }

}
