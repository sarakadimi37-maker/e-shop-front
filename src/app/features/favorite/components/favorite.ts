import {Component, computed, inject, OnInit} from '@angular/core';
import {FavoriteStore} from '../services/favorite.store';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {ProductCategories} from '../../products/components/product-category/product-categories';
import {Router, RouterLink} from '@angular/router';
import {FavoriteApi} from '../services/favorite.api';
import {FavoriteFacade} from '../services/favorite.facade';
import {CartFacade} from '../../cart/services/cart.facade';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-favorite',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    NgClass,
    ProductCategories,
    RouterLink,
  ],
  templateUrl: './favorite.html',
  styleUrl: './favorite.scss',
})
export class Favorite{

  protected favoriteStore = inject(FavoriteStore);
  protected favoriteFacade = inject(FavoriteFacade);
  protected cartFacade = inject(CartFacade);


  totalPriceInFavorites = computed(()=>{
    return this.favoriteStore.favorites()
      .map(product => product.price)
      .reduce((sum, productPrice) => sum + productPrice, 0);
  });

  addFavoriteProducts() {
    this.favoriteStore.favorites().forEach(fav => {
      this.cartFacade.add(fav,1);
    });
  }
}
