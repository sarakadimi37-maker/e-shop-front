import {Component, input, output} from '@angular/core';
import {CurrencyPipe, NgClass} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {Product} from '../../../../models/product-model';

@Component({
  selector: 'app-product-detail-card',
  imports: [
    CurrencyPipe,
    MatCard,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './product-detail-card.html',
  styleUrl: './product-detail-card.scss'
})
export class ProductDetailCard {
  product = input.required<Product>();
  productAddedTCard = output<Product>();

  onAddToCart(): void {
    console.log(`${this.product().name} ajouter au panier!`);
    // émettre l'évenement vers le parent
    this.productAddedTCard.emit(this.product());
  }



}
