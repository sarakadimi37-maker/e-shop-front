import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../models/product-model';
import {ProductDetail} from '../components/product-detail/product-detail';

@Component({
  selector: 'app-product-detail.page',
  imports: [
    ProductDetail
  ],
  template: `
    <app-product-detail></app-product-detail>
  `,
  styles: ``
})
export default class ProductDetailPage {

  private route= inject(ActivatedRoute);
  product:Product = this.route.snapshot.data['myProduct'];
}
