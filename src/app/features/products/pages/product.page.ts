import { Component } from '@angular/core';
import {ProductList} from '../components/product-list/product-list';

@Component({
  selector: 'app-product.page',
  imports: [
    ProductList
  ],
  template: `
    <h2>Nos Produits</h2>
    <app-product-list></app-product-list>
  `,
  styles: ``
})
export default class ProductPage {

}
