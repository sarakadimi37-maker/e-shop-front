import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {Product} from '../../../../models/product-model';
import {ProductCard} from '../product-card/product-card';
import {Review} from '../../../../models/Review-model';
import {Filter} from '../filter/filter';
import {ProductApiService} from '../../services/product-api.service';
import {CartStore} from '../../../cart/services/cart.store';
import {FavoriteStore} from '../../../favorite/services/favorite.store';
import {FavoriteFacade} from '../../../favorite/services/favorite.facade';

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
  private cartStore = inject(CartStore);
  private favoriteStore = inject(FavoriteStore);
  protected favoriteFacade = inject(FavoriteFacade);

  products = signal<Product[]>([]);
  isDeleting = signal<number | null>(null);
  categorySignal = signal<string[]>([]);

 // favoriteIds: number[] = [];
  historiqueAllReviews: Review[] = [];

  async ngOnInit() {
   await this.loadProducts();

  }
  async loadProducts(): Promise<void> {
    try {
      const products :Product[] = await this.productApi.getProducts();
      const productsStore = this.cartStore.productsInCart();
      products.forEach(product => {
        // trouver si le produit exist deja dans le panier
       const storeItem = productsStore
         .find(element => element.product.id === product.id);
       if(storeItem) {
         product.quantity -= storeItem.quantity;
       }
      })
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
  onAddedRate(review: Review): void {
    const productId = review.productId;
    let produit = this.products().find((product: Product) => product.id === productId);
    if(produit) {
      this.historiqueAllReviews.push(review);
      let historiqueReviewProduit = this.historiqueAllReviews.filter(r => r.productId === productId);

      let totalRate = 0;
      historiqueReviewProduit.forEach((review: Review) => {
        totalRate += review.rating;
      });
      produit.rating = totalRate / historiqueReviewProduit.length;
    }
     console.log("review =>" + this.historiqueAllReviews);
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

  protected readonly FavoriteFacade = FavoriteFacade;
}
