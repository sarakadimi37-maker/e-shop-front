import {Component, inject, OnInit, signal} from '@angular/core';
import {Product} from '../../../../models/product-model';
import {ProductApiService} from '../../../products/services/product-api.service';
import {Pageable} from '../../../../models/Pageable';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductFormModel} from '../../../../models/product-form-model';
import {ProductCategories} from '../../../products/components/product-category/product-categories';
import {categories, CategoryType} from '../../../products/components/filter/filter';
import {ProductModal} from '../product-modal/product-modal';


@Component({
  selector: 'app-admin',
  imports: [
    NgClass,
    ReactiveFormsModule,
    ProductCategories,
    NgOptimizedImage,
    ProductModal
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  categories = signal<CategoryType[]>(categories);
  isModalOpen = signal(false);
  modalTitle = signal('Ajouter un produit');
  selectedProduct = signal<Product | null>(null);
  products = signal<Product[]>([]);

  currentPage: number = 0;
  totalPages: number = 0;
  protected totalItems: number = 0;



  protected productApi: ProductApiService = inject(ProductApiService);



  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  private async loadProducts() {
    const productPginate = await this.productApi.getProductsPaginate(new Pageable(this.currentPage, 5));
    this.currentPage = productPginate.currentPage;
    this.totalPages = productPginate.totalPages;
    this.totalItems = productPginate.totalItems;
    this.products.set(productPginate.content);
  }

  openAddModal() {
    console.log(this.isModalOpen());
    this.selectedProduct.set(null);
    this.modalTitle.set('Ajouter un produit');
    this.isModalOpen.set(true);
  }

  openEditModal(product: Product) {
    this.selectedProduct.set(product);
    this.modalTitle.set(`Modifier le produit : ${product.name}`);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }


  deleteProduct(product: Product) {
    const confirmed = confirm(
      `Êtes-vous sûr de vouloir supprimer ${product.name} ?`
    );

    if (confirmed) {
      this.products.update(products =>
        products.filter(p => p.id !== product.id)
      );
      // appel au service pour delete
      alert('Produit supprimé avec succès!');
    }
  }

  async changePage(page: number) {
    this.currentPage = page;
    await this.loadProducts();
  }

  range(start: number, end: number): number[] {
    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
  }



}
