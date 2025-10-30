import {Component, inject} from '@angular/core';
import {CartStore} from '../../services/cart.store';
import {CurrencyPipe, NgClass} from '@angular/common';
import {CartFacade} from '../../services/cart.facade';
import {NotificationService} from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-cart-summary',
  imports: [
    NgClass,
    CurrencyPipe
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


}
