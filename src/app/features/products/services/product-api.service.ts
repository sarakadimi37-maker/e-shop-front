import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../../../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseApi{
  private readonly endpoint = '/products.json';

  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>(this.endpoint);
  }

  async  getProductById(id: number): Promise<Product> {
    return this.get<Product>(`${this.endpoint}/${id}`);
  }

  async createProduct(product: Product): Promise<Product> {
    return  this.post<Product>(this.endpoint, product);
  }

  async updateProduct(id: number, product: Product): Promise<Product> {
    return this.put<Product>(`${this.endpoint}/${id}`, product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.delete<void>(`${this.endpoint}/${id}`);
  }

}
