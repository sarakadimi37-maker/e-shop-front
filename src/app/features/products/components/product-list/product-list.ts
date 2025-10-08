import {Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {Product} from '../../../../models/product-model';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductCard} from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [
    MatCardTitle,
    ProductCard
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {

  ngOnInit(): void {
      console.log('ngOnInit');
  }

  private route = inject(ActivatedRoute);
  products: Product[] = this.route.snapshot.data['myProducts'];

  nbInStock (): number {
    return this.products.filter((p) => p.inStock).length;
  }


}
