import {Component, computed, inject, OnInit} from '@angular/core';
import {FavoriteStore} from '../services/favorite.store';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {ProductCategories} from '../../products/components/product-category/product-categories';
import {RouterLink} from '@angular/router';
import {FavoriteApi} from '../services/favorite.api';
import {FavoriteFacade} from '../services/favorite.facade';
import {CartFacade} from '../../cart/services/cart.facade';

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
export class Favorite implements OnInit {

  protected favoriteStore = inject(FavoriteStore);
  protected favoriteApi = inject(FavoriteApi);
  protected favoriteFacade = inject(FavoriteFacade);
  protected cartFacade = inject(CartFacade);
  totalPriceInFavorites = computed(()=>{
    return this.favoriteStore.favorites()
      .map(product => product.price)
      .reduce((sum, productPrice) => sum + productPrice, 0);
  });


  ngOnInit(): void {


  }


  addFavoriteProducts() {
    this.favoriteStore.favorites().forEach(fav => {
      this.cartFacade.add(fav,1);
    });
  }
}
