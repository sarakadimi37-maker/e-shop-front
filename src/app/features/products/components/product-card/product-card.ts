import {Component, computed, effect, inject, input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {Product} from '../../../../models/product-model';
import {CurrencyPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatButton,
    MatCardImage,
    CurrencyPipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
 export class ProductCard {
  product = input.required<Product>(); // input

  displayPrice = computed(()=>{
    const p = this.product();
    return p.inStock ? `${p.price}€` : 'Prix indisponible';
  });

  constructor() {
    effect(() => {
      console.log('Nouveau produit reçu : ', this.product().name);
    });
  }

  onAddToCart(): void {
    console.log(`${this.product().name} ajouter au panier!`);
  }

  onToogleFavorite(): void {
    console.log(`${this.product().name} ajouter au favoris!`);{}
  }

}
