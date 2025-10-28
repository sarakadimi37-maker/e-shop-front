import {Product} from '../../../models/product-model';
import {CartItemModel} from '../model/cart-item-model';


export class CartRules {

  // un produit sans identifiant doit lever une erreur
  static validateAdd(product: Product,totalPriceInCart: number, qtOfBuy?: number ) {
    if(product.id === undefined || product.id === null){
      throw new Error('Produit est invalide');
    }

    // impossible d’ajouter une quantité nulle ou négative
   if(qtOfBuy === undefined || qtOfBuy <= 0 ){
    throw new Error('impossible d’ajouter une quantité nulle ou négative');
   }

   //- la quantité ajoutée ne doit pas dépasser le stock disponible du produit
    if (qtOfBuy > product.quantity) {
      throw new Error('la quantité ajoutée ne doit pas dépasser le stock disponible du produit');
    }

    // - le prix du produit doit être ≥ 0
    if(product.price <= 0){
      throw new Error('le prix du produit doit être ≥ 0');
    }
    // - le montant total du panier ne doit jamais dépasser une limite définie (ex : 5000€)
      const totalPrice = (product.price * qtOfBuy) + totalPriceInCart;
    if(product.price > 5000 || totalPrice > 5000){
      throw new Error('le montant total du panier ne doit jamais dépasser une limite définie (ex : 5000€)');
    }
  }

  // - Une méthode `validateRemove` qui vérifie :
  // - une tentative de suppression d’un produit absent du panier doit lever une erreur

  static validateRemove(produtId: number, qtOfRemove: number, storeItems: CartItemModel[]) {
   const productInCart = storeItems
     .find((item => item.product.id === produtId));
   if(productInCart){
     if(qtOfRemove > productInCart.quantity ){
       throw new Error('impossible de mettre une quantité nulle ou négative');
     }
   }else{
     throw new Error('ce produit ne existe pas');
   }
  }


  //- Une méthode `validateUpdate` qui vérifie :
  //     - impossible de mettre une quantité nulle ou négative
  //     - impossible de dépasser le stock disponible
  //     - impossible de mettre à jour un produit absent du panier




}
