import {computed, inject, Injectable, input, signal} from '@angular/core';
import {Product} from '../../../models/product-model';
import {ProductApiService} from '../../products/services/product-api.service';

@Injectable({
  providedIn: 'root'
})
export class CartStore {

  productApi = inject(ProductApiService);
  productsInCart = signal<Product[]>([]);

   totalPrice = computed(()=> {
     const products = this.productsInCart();
     let sum = 0;
     products.forEach(product => {
       sum += product.price;
     });
     return sum;
   });



  addToCart(product: Product) {
    // ... c'est à dire que c'est un tableau de produit, donc ici liste de produit += produit
    this.productsInCart.update(products => [...products, product]);
  }

  removeFromCart(product: Product) {
    //
   this.productsInCart.update(products =>products.filter((p) => p.id !== product.id));
  }

  clearCart() {
    this.productsInCart.set([]);
  }

}
