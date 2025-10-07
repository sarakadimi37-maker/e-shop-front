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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, MatCard, MatCardHeader,
    MatCardTitle, MatCardSubtitle, MatCardContent,
    MatCardActions, NgClass, MatCardImage, MatButton,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {
  constructor(private router: Router,
              ) {
  }
  ngOnInit(): void {
      console.log('ngOnInit');
  }
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F6' ];
  private route = inject(ActivatedRoute);
  products: Product[] = this.route.snapshot.data['myProducts'];


  nbInStock (): number {
    return this.products.filter((p) => p.inStock).length;
  }

  productDetail(id: number) {
    this.router.navigate(['/products', id]);
  }
}
