import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../../../models/product-model';
import {ProductsPaginate} from '../../../models/products-paginate';
import {Pageable} from '../../../models/Pageable';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseApi{

  private readonly endpointProduct = '/products';

  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>(this.endpointProduct);
  }
  async getProductsPaginate(pageable: Pageable): Promise<ProductsPaginate> {

    return this.get<ProductsPaginate>(`${this.endpointProduct}?page=${pageable.page}&size=${pageable.size}`);
  }

  async  getProductById(id: number): Promise<Product | undefined> {
    return this.get<Product>(`${this.endpointProduct}/${id}`);
  }

  async createProduct(product: Product): Promise<Product> {
    return  this.post<Product>(this.endpointProduct, product);
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    return this.put<Product>(`${this.endpointProduct}/${id}`, product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.delete<void>(`${this.endpointProduct}/${id}`);
  }

  async getDiscount() {
    return this.get<Product[]>(`${this.endpointProduct}/discount?page=0&size=4`);
  }
}
