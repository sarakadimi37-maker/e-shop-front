import {Component, inject, signal} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductFormModel} from '../../../../models/product-form-model';
import {categories, CategoryType} from '../../../products/components/filter/filter';


@Component({
  selector: 'app-product-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.scss'
})

export class ProductModal {

  categories = signal<CategoryType[]>(categories);

  protected fb = inject(NonNullableFormBuilder);

  productForm: FormGroup<ProductFormModel> = this.fb.group({
    name: this.fb.control('', Validators.required),
    description:  this.fb.control('', Validators.required),
    image:  this.fb.control('', Validators.required),
    price:  this.fb.control(0, Validators.required),
    category:  this.fb.control('', Validators.required),
    discount:  this.fb.control(0, Validators.required),
    quantity:  this.fb.control(0, Validators.required),
    status:  this.fb.control('', Validators.required),
    promotionStartDate: this.fb.control(new Date()),
    promotionEndDate: this.fb.control(new Date()),
  });

  submitForm() {
    alert('Produit enregistré avec succès !');
    this.productForm.reset();
    //this.closeModal();
  }

  cancel() {

  }
}
