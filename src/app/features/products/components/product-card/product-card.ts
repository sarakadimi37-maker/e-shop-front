import {Component} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatButton,
    MatCardImage
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  title: string = "mac bookPro";
  price: number = 299;
  inStock: boolean = true;
  discount: number = 0.1;
  features: string[] = ['Écran Retina', 'M1 Pro', '16 Go RAM'];

  constructor(private router: Router,
              private location: Location,) {
  }

  getDiscountPrice(): number {
    return this.price -( 1- this.discount);
  }
  onBuyClick(): void {
    if(this.inStock){
      console.log(`${this.title} ajouter au panier!`);
    }
  }

/*
  goBack() {
    this.location.assign('../features/products/pages/product-detail.page');
  }
 */
}
