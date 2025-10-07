import { Component } from '@angular/core';
import {ProductCard} from '../components/product-card/product-card';

@Component({
  selector: 'app-product-detail.page',
  imports: [
    ProductCard
  ],
  template: `
    <p>
      product-detail.page works!
    </p>
  `,
  styles: ``
})
export default class ProductDetailPage {

}
