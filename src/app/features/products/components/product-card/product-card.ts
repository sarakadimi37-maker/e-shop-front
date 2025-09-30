import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  title: string = "mac bookPro";
  price: number = 299;
  inStock: boolean = true;

  onBuyClick(): void {
    if(this.inStock){
      console.log(`${this.title} ajouter au panier!`);
    }
  }
}
