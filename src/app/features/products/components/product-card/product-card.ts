import {Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {Product} from '../../../../models/product-model';
import {CurrencyPipe, NgClass} from '@angular/common';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {RateFormModel,} from '../../../../models/Rate-form-model';
import {Review} from '../../../../models/Review-model';
import {CartStore} from '../../../cart/services/cart.store';
import {CartFacade} from '../../../cart/services/cart.facade';


@Component({
  selector: 'app-product-card',
  imports: [
    MatCard,
    CurrencyPipe,
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    CdkTextareaAutosize,

  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
 export class ProductCard {

  product = input.required<Product>(); //---- input
  productAddedToFavorites = output<Product>();
  productRemoveFromFavorites = output<Product>();
  isFavorite = input<boolean>(false);
  showRatingForm: boolean = false;
  rateAdded = output<Review>();
  qtOfBuy = signal<number| undefined>(undefined);

  cartFacade = inject(CartFacade);

  displayPrice = computed(()=>{
    const p = this.product();
    return p.inStock ? `${p.price}€` : 'Prix indisponible';
  });

  constructor() {
    effect(() => {
      console.log('Nouveau produit reçu : ', this.product().name);
    });
  }
  protected fb = inject(NonNullableFormBuilder);

  ratingForm: FormGroup<RateFormModel> = this.fb.group({
    rate: this.fb.control('', Validators.required),
    comment: this.fb.control('')
  })

  onToogleFavorite(): void {
    if (this.isFavorite()) {
      this.productRemoveFromFavorites.emit(this.product());
    }else{
      this.productAddedToFavorites.emit(this.product());
    }
  }

  sendRate() {
    const review: Review = {
      productId: this.product().id,
      rating: Number(this.ratingForm.controls.rate.value),
      comment: this.ratingForm.controls.comment.value,
      date: new Date(),
    }
    this.rateAdded.emit(review);
    this.showRatingForm = false;
  }

  onToogleShowRatingForm() {
    this.showRatingForm = !this.showRatingForm;
  }

  incQt() {
    this.qtOfBuy.update((currentQt) => {
      if(currentQt === undefined){
        return 1;
      } else {
        return currentQt+1
      }

    });
  }

  decQt() {
    this.qtOfBuy.update((currentQt) => {
      if(currentQt === undefined){
        return 0;
      }else{
        return currentQt-1
      }
    });
  }
}
