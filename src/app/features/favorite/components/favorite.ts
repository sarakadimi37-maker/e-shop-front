import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../../models/product-model';
import {FavoriteStore} from '../services/favorite.store';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {ProductCategories} from '../../products/components/product-category/product-categories';
import {RouterLink} from '@angular/router';
import {HomePage} from '../../home/pages/home.page';
import {FavoriteApi} from '../services/favorite.api';
import {FavoriteFacade} from '../services/favorite.facade';

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

  ngOnInit(): void {
  }


}
