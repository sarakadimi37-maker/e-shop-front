import {Component, inject} from '@angular/core';
import {ProductCard} from '../components/product-card/product-card';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../models/product-model';

@Component({
  selector: 'app-product-detail.page',
  imports: [
    ProductCard
  ],
  template: `
    <app-product-card [product]="product"></app-product-card>

  `,
  styles: ``
})
export default class ProductDetailPage {

  private route= inject(ActivatedRoute);
  product:Product = this.route.snapshot.data['myProduct'];
}
