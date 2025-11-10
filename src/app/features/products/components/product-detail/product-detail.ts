import {Component, inject, OnInit, output, signal} from '@angular/core';
import {Product} from '../../../../models/product-model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductApiService} from '../../services/product-api.service';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {ConverterCategory} from '../../../../shared/utile/ConverterCategory';
import {CartFacade} from '../../../cart/services/cart.facade';
import {FavoriteStore} from '../../../favorite/services/favorite.store';
import {FavoriteFacade} from '../../../favorite/services/favorite.facade';
import {CartStore} from '../../../cart/services/cart.store';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Review} from '../../../../models/Review-model';
import {RateFormModel} from '../../../../models/Rate-form-model';
import {ProductStore} from '../../services/product.store';
import {PriceDiscount} from '../price-discount/price-discount';

@Component({
  selector: 'app-product-detail',
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    PriceDiscount
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {

  protected fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productApi = inject(ProductApiService);
  protected productStore= inject(ProductStore);
  protected cartFacade = inject(CartFacade);
  protected cartStore = inject(CartStore);
  protected favoriteStore = inject(FavoriteStore);
  protected favoritefacade = inject(FavoriteFacade);
  protected product = signal<Product | undefined>(undefined);
  qtOfBuy = signal<number>(0);
  isFavorite = signal<boolean>(false);
  rateAdded = output<Review>();

  protected readonly ConverterCategory = ConverterCategory;

  async ngOnInit(): Promise<void> {

      const prodactId = Number(this.route.snapshot.paramMap.get('id'));

      if (prodactId) {
        const product = await this.productApi.getProductById(prodactId);
        console.log('product', product);
        if (product) {

          // Mettre à jour la quantité de produit en prenant en compte la quantité de produit dans le panier
          const storeItem = this.cartStore.productsInCart()
            .find(element => element.product.id === product.id);
          if(storeItem) {
            product.quantity -= storeItem.quantity;
          }

          // mettre à jour les avis
          this.updateRating(product);


          this.product.set(product)
        }else{
          this.router.navigate(['/error']);
        }
        const favoriteProduct= this.favoriteStore.favorites().find((p)=>p.id === prodactId);
        if (favoriteProduct) {
          this.isFavorite.set(true);
        }else{
          this.isFavorite.set(false);
        }
      }

  }

  private updateRating(product: Product) {
    const allReviews = this.productStore.historiqueAllReviews();
    if (allReviews.has(product.id)) {
      const productReviews = allReviews.get(product.id)!;
      const ratingSum = productReviews.reduce((sum, review) => sum + review.rating, 0);
      const ratingAverage = ratingSum / productReviews.length;
      // mettre à jour la moyenne des avis en prennant en compte les avis initial du produit
      product.rating = Number(((product.rating + ratingAverage) / 2).toFixed(2));
    }
  }

  incQt() {
    this.qtOfBuy.update((currentQt) => {
      return currentQt+1
    });
  }

  decQt() {
    this.qtOfBuy.update((currentQt) => {
      if(currentQt <= 0){
        return 0;
      }else{
        return currentQt-1;
      }
    });
  }

  onToogleFavorite(): void {
    if (this.isFavorite()) {
      this.favoritefacade.onProductRemoveFromFavorite(this.product()!);
      this.isFavorite.set(false);
    }else{
      this.favoritefacade.onProductAddedToFavorite(this.product()!);
      this.isFavorite.set(true);
    }
  }

  ratingForm: FormGroup<RateFormModel> = this.fb.group({
    rate: this.fb.control('', Validators.required),
    comment: this.fb.control('')
  })

  sendRate() {
    const review: Review = {
      productId: Number(this.product()?.id),
      rating: Number(this.ratingForm.controls.rate.value),
      comment: this.ratingForm.controls.comment.value,
      date: new Date(),
    }
    this.productStore.historiqueAllReviews.update((mapRating)=>{
      if(mapRating.has(review.productId)){
        mapRating.get(review.productId)?.push(review);
      }else{
        mapRating.set(review.productId, [review]);
      }
      return mapRating;
    });
    // mettre à jour les avis
    this.updateRating(this.product()!);
    this.product.set(this.product()!)

    this.ratingForm.controls.rate.reset();
    this.ratingForm.controls.comment.reset();

  }







}
