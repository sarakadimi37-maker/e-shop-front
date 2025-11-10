import {Component, input} from '@angular/core';
import {Product} from '../../../../models/product-model';
import {CurrencyPipe} from '@angular/common';
import {ProductUtile} from '../../../../shared/utile/product-utile';

@Component({
  selector: 'app-price-discount',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './price-discount.html',
  styleUrl: './price-discount.scss',
})
export class PriceDiscount {

//  product = input<Product>();
  price = input<number>(0);
  discountPercentage = input<number>();

  calculatePrice() {
    const discount = this.discountPercentage();
    const price = this.price();

    return ProductUtile.getDiscountPrice(discount, price);
  }


}
