import {Component, inject} from '@angular/core';
import {CartStore} from '../../services/cart.store';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {CartFacade} from '../../services/cart.facade';
import {NotificationService} from '../../../../shared/services/notification.service';
import {FavoriteStore} from '../../../favorite/services/favorite.store';
import {PriceDiscount} from '../../../products/components/price-discount/price-discount';
import {ProductUtile} from '../../../../shared/utile/product-utile';

@Component({
  selector: 'app-cart-summary',
  imports: [
    NgClass,
    CurrencyPipe,
    NgOptimizedImage,
    PriceDiscount
  ],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss'
})
export class CartSummary {

  cartStoreService = inject(CartStore);
  cartFacade = inject(CartFacade);


  subTotal(): number {
    return this.cartStoreService.productsInCart()
      .reduce((sum, item) => sum + item.quantity, 0);
  }


  protected readonly ProductUtile = ProductUtile;
}
