import {computed, Injectable, signal} from '@angular/core';
import {Product} from '../../../models/product-model';
import {CartItemModel} from '../model/cart-item-model';
import {ProductUtile} from '../../../shared/utile/product-utile';

@Injectable({
  providedIn: 'root'
})
export class CartStore {

  productsInCart = signal<CartItemModel[]>([]);

   totalPrice = computed(()=> {
     return this.productsInCart()
      // .reduce((sum, item) =>
        // (item.quantity * item.product.price) + sum, 0)
       .reduce((sum, item) =>
         (ProductUtile
           .getDiscountPrice(
             item.product.discountPercentage,
             (item.product.price * item.quantity)
           )) + sum, 0)
   });


  addProductToCart(product: Product, qtOfBuy: number) {
    // creation
    const item: CartItemModel = {
      product: product,
      quantity: qtOfBuy
    }
    this.productsInCart.update(items => [...items, item]);
  }

  updateProductToCart(product: Product, qtOfBuy: number) {
    this.productsInCart.update(items => {
      return items.map(item => {
        if(item.product.id === product.id){
          item.quantity += qtOfBuy;
        }
        return item;
      })
    })
  }

  removeFromCart(productId: number) {
    //
   this.productsInCart.update(items =>items.filter((item) => item.product.id !== productId));
  }

  reduceQtOfProduct(productId: number, qtOfRemove: number) {

    this.productsInCart.update(items => {
      return items.map(item => {
        if (item.product.id === productId) {
          item.quantity -= qtOfRemove;
        }
        return item;
      })
    });
  }

  clearCart() {
    this.productsInCart.set([]);
  }

}
