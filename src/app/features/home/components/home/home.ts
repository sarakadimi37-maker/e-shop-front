import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '../../../../models/product-model';
import {NgOptimizedImage} from '@angular/common';
import {ProductApiService} from '../../../products/services/product-api.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  products = signal<Product[]>([]);
  protected productApi = inject(ProductApiService);

  async ngOnInit() {
    const products = await this.productApi.getProducts();

    const saleProducts = products.filter((product: Product) => product.isPromo);
    const newProducts = products.filter((product: Product) => product.isNew);

    let results: Product[] = [];
    if(saleProducts.length > 2) {
      const items = saleProducts.slice(0, 2);
      results = [...results, ...items]
    } else {
      results = [...results, ...saleProducts];
    }

    if(newProducts.length > 2) {
      const items = newProducts.slice(0, 2);
      results = [...results, ...items];
    }else {
      results = [...results, ...newProducts];
    }

    this.products.set(results);
  }

}
