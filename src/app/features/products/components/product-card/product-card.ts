import {Component} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  //@Input()
  //product : Product;
  title: string = "mac bookPro";
  price: number = 299;
  inStock: boolean = true;
  discount: number = 0.1;
  features: string[] = ['Écran Retina', 'M1 Pro', '16 Go RAM'];

  getDiscountPrice(): number {
    return this.price -( 1- this.discount);
  }
  onBuyClick(): void {
    if(this.inStock){
      console.log(`${this.title} ajouter au panier!`);
    }
  }


}
