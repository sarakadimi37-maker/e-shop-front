import {Component, inject} from '@angular/core';
import {CartStore} from '../../services/cart-store';
import {CurrencyPipe, NgClass} from '@angular/common';

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

}
