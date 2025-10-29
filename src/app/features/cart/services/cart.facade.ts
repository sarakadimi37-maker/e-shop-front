import {inject, Injectable} from '@angular/core';
import {Product} from '../../../models/product-model';
import {CartRules} from '../domain/CartRules';
import {ErrorService} from '../../../core/services/error.service';
import {CartStore} from './cart.store';
import {CartApi} from './cart.api';
import {NotificationService} from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartFacade {

  cartStore = inject(CartStore);
  errorService = inject(ErrorService);
  cartApi = inject(CartApi);
  notificationService = inject(NotificationService);


  async add(product: Product, qtOfBuy?: number){
    // vérifier la validité de produit avant de mettre en panier
    try {
      CartRules.validateAdd(product, this.cartStore.totalPrice(), qtOfBuy);
      const existingItem = this.cartStore.productsInCart()
        .find((item) => item.product.id === product.id);
      if(existingItem){
        // update mode
        this.cartStore.updateProductToCart(product, qtOfBuy!);
        await this.cartApi.updateCart({product: product, quantity: qtOfBuy! });
        this.notificationService.showSuccess("Produit a été mise à jour avec succès.");
      }else{
        // Create mode
        this.cartStore.addProductToCart(product, qtOfBuy!);

        await this.cartApi.createCart({product: product, quantity: qtOfBuy! });
        this.notificationService.showSuccess("Produit a été ajouter avec succès.");
      }
      product.quantity -= qtOfBuy!;

    }catch(error){
      // dans le cas de problème levé via l'appel de validateAdd de Rule
      if(error instanceof Error){
        this.errorService.notify(error.message);
      } else {
        this.errorService.notify('Une erreur est survenue.');
      }
    }
  }

  async reduceQt(product: Product, qtOfRemove: number) {
    try {
      // ensemble des produits qui ont été ajouter dans le panier, et sa quantité ajoutée
      const productInCart = this.cartStore.productsInCart();
      CartRules.validateRemove(product.id, qtOfRemove, productInCart);
      this.cartStore.reduceQtOfProduct(product.id, qtOfRemove);
      await this.cartApi.updateCart({product: product, quantity: qtOfRemove! });
    }catch(error){
      // dans le cas de problème levé via l'appel de validateAdd de Rule
      if(error instanceof Error){
        this.errorService.notify(error.message);
      } else {
        this.errorService.notify('Une erreur est survenue.');
      }
    }
  }

  async remove(productId: number) {
    this.cartStore.removeFromCart(productId);
    await this.cartApi.deleteCart(productId);
    this.notificationService.showSuccess("Produit a été supprimer avec succès.");

  }

  clearProductsInCart() {
    this.cartStore.productsInCart().forEach(async (item) => {
      await this.cartApi.deleteCart(item.product.id);
    })
    this.cartStore.clearCart();
    this.notificationService.showSuccess("Le panier a été vider avec succès.");
  }
}
