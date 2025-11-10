import {Component, effect, inject, input, output, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '../../../../models/product-model';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CartFacade} from '../../../cart/services/cart.facade';
import {ProductCategories} from '../product-category/product-categories';
import {PriceDiscount} from '../price-discount/price-discount';


@Component({
  selector: 'app-product-card',
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    NgOptimizedImage,
    ProductCategories,
    PriceDiscount,
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
 export class ProductCard {

  product = input.required<Product>(); //---- input
  productAddedToFavorites = output<Product>();
  productRemoveFromFavorites = output<Product>();
  isFavorite = input<boolean>(false);

  qtOfBuy = signal<number>(0);

  cartFacade = inject(CartFacade);

  constructor() {
    effect(() => {
      console.log('Nouveau produit reçu : ', this.product().name);
    });
  }


  onToogleFavorite(): void {
    if (this.isFavorite()) {
      this.productRemoveFromFavorites.emit(this.product());
    } else {
      this.productAddedToFavorites.emit(this.product());
    }
  }


  incQt() {
    this.qtOfBuy.update((currentQt) => {
      return currentQt + 1
    });
  }

  decQt() {
    this.qtOfBuy.update((currentQt) => {
      if (currentQt <= 0) {
        return 0;
      } else {
        return currentQt - 1;
      }
    });
  }
}
