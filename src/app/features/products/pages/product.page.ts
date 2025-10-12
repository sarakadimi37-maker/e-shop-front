import { Component } from '@angular/core';
import {ProductList} from '../components/product-list/product-list';

@Component({
  selector: 'app-product.page',
  imports: [
    ProductList
  ],
  template: `
    <app-product-list></app-product-list>
  `,
  styles: ``
})
export default class ProductPage {

}
