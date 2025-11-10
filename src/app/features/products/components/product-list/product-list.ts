import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {Product} from '../../../../models/product-model';
import {ProductCard} from '../product-card/product-card';
import {Review} from '../../../../models/Review-model';
import {Filter} from '../filter/filter';
import {ProductApiService} from '../../services/product-api.service';
import {CartStore} from '../../../cart/services/cart.store';
import {FavoriteStore} from '../../../favorite/services/favorite.store';
import {FavoriteFacade} from '../../../favorite/services/favorite.facade';
import {ProductStore} from '../../services/product.store';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCard,
    Filter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {

  private productApi = inject(ProductApiService);
  protected productStore = inject(ProductStore);
  private cartStore = inject(CartStore);
  private favoriteStore = inject(FavoriteStore);
  protected favoriteFacade = inject(FavoriteFacade);


  products = signal<Product[]>([]);
  isDeleting = signal<number | null>(null);
  categorySignal = signal<string[]>([]);

 // favoriteIds: number[] = [];


  async ngOnInit() {
   await this.loadProducts();

  }
  async loadProducts(): Promise<void> {
    try {
      const products :Product[] = await this.productApi.getProducts();

      const productsinCart = this.cartStore.productsInCart();
      products.forEach(product => {

        // mettre à jour la quantité d'un produit si celui a été ajouter dans le cart
        // trouver si le produit exist deja dans le panier
       const storeItem = productsinCart
         .find(element => element.product.id === product.id);
       if(storeItem) {
         // on sousstrait la quantité de produit qui est dans panier au produit(mettre à jour de stock)
         product.quantity -= storeItem.quantity;
       }

       // mettre à jour les avis
        const allReviews = this.productStore.historiqueAllReviews();
       if(allReviews.has(product.id)) {
         const productReviews = allReviews.get(product.id)!;
         const ratingSum = productReviews.reduce((sum, review) => sum+review.rating, 0);
         const ratingAverage = ratingSum / productReviews.length;
         // mettre à jour la moyenne des avis en prennant en compte les avis initial du produit
         product.rating = (product.rating + ratingAverage) / 2;
       }
      });
      this.products.set(products);
    }catch(err) {
      console.error(err);

    }

  }

  async deleteProduct(productId: number): Promise<void> {
    this.isDeleting.set(productId);
    try {
      await this.productApi.deleteProduct(productId);
      this.products.update(products =>products.filter(p => p.id !== productId));
    } catch(err) {

    } finally {
      this.isDeleting.set(null);
    }
  }

  /**
   * methode qui retourn true s'il trouve l'id passer
   * en parametre dans la list faviriteIds
   * @param id c'est id de produit
   */
  isInFavorites(productId:number) {
    // chercher s'il esxiste un produit dans le favoris dont son id = à l'id passé en parametre
    const favoriteProduct = this.favoriteStore.favorites().find(p => p.id === productId);
    // on return true si le produit est diffirent de undifined sinon false.
    return favoriteProduct !== undefined;

  }

  nbInStock (): number {
    return this.products().filter((p) => p.inStock).length;
  }

  viewProducts = computed(()=>{
    const categories : string[] = this.categorySignal();
    console.log(`category in parent -> ${categories}`);
    if(categories.length === 0) {
      return this.products();
    }else{
      return this.products().filter(p => categories.includes(p.category));
    }
  });

}
