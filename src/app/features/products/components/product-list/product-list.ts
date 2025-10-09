import {Component, inject, OnInit} from '@angular/core';
import {MatCardTitle} from '@angular/material/card';
import {Product} from '../../../../models/product-model';
import {ActivatedRoute} from '@angular/router';
import {ProductCard} from '../product-card/product-card';
import {Review} from '../../../../models/Review-model';

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
  private route = inject(ActivatedRoute);
  products: Product[] = this.route.snapshot.data['myProducts'];
  cartItems: Product[] = [];
  faviriteIds: number[] = [];
  reviews: Review[] = [];

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  // methode appelée par un output envoyé depuis l'enfant
  onProductAddedToCart(product: Product): void {
    this.cartItems.push(product);
    console.log(`${product.name} ajouter au panier`);
    console.log(`Panier : ${this.cartItems.length} articles`);
  }

  /**
    👇 Méthode appelée par un output envoyé depuis l'enfant
   * methode qui traite les produis à mettre en favoris reçue depuis l'enfant
   * @param product
   */
  onProductAddedToFavorite(product: Product): void {
    this.faviriteIds.push(product.id);
    console.log(`${product.name} ajouter au favoris`);
  }

  onProductRemoveFromFavorite(product: Product): void {
    // ----------------??
    this.faviriteIds = this.faviriteIds.filter(id => id !== product.id);
    console.log(`${product.name} retiré de favoris`);
  }
  /**
   * methode qui retourn true s'il trouve l'id passer
   * en parametre dans la list faviriteIds
   * @param id c'est id de produit
   */
  isInFavorites(productId:number) {
    return this.faviriteIds.includes(productId);
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  getFavoritesCount(): number {
    return this.faviriteIds.length;
  }
  nbInStock (): number {
    return this.products.filter((p) => p.inStock).length;
  }
  onAddedRate(review: Review): void {
    this.reviews.push(review);
    // calcule moyen des notes
    this.products.forEach(p => {
      const productId = p.id;
      const currentProductReview = this.reviews.filter(r => r.productId === productId);
      let totalRate = 0;
      currentProductReview.forEach((review: Review) => {
        totalRate += review.rating;
      })
      const avrageRating = totalRate / currentProductReview.length;
      p.rating = avrageRating;
    })

     console.log("review =>" + this.reviews);
  }


}
