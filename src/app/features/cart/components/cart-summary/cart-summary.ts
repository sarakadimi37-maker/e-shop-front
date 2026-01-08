import {Component, inject, OnInit} from '@angular/core';
import {CartStore} from '../../services/cart.store';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {CartFacade} from '../../services/cart.facade';
import {NotificationService} from '../../../../shared/services/notification.service';
import {FavoriteStore} from '../../../favorite/services/favorite.store';
import {PriceDiscount} from '../../../products/components/price-discount/price-discount';
import {ProductUtile} from '../../../../shared/utile/product-utile';
import {AuthService} from '../../../auth/auth.service';

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
export class CartSummary implements OnInit {


  protected cartStoreService = inject(CartStore);
  protected cartFacade = inject(CartFacade);
  protected authService = inject(AuthService);

  async ngOnInit(): Promise<void> {

    await this.cartStoreService.loadProductInCart();
  }

  subTotal(): number {
    return this.cartStoreService.productsInCart()
      .reduce((sum, item) => sum + item.quantity, 0);
  }


  protected readonly ProductUtile = ProductUtile;
}
