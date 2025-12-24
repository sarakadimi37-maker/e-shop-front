import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../../../models/product-model';
import {ProductsPaginate} from '../../../models/ProductsPaginate';
import {Pageable} from '../../../models/Pageable';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseApi{
  private readonly endpoint = '/products.json';
  private readonly endpointProduct = '/e-shop/products';

  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>(this.endpoint);
  }
  async getProductsPaginate(pageable: Pageable): Promise<ProductsPaginate> {

    return this.get<ProductsPaginate>(`${this.endpointProduct}?page=${pageable.page}&size=${pageable.size}`);
  }

  async  getProductById(id: number): Promise<Product | undefined> {
    //simulation de methode getById en attendant de l'api
    const products = await this.getProducts();
    const product = products.find((p)=>p.id === id);
    return Promise.resolve(product);
    // à decommenter dès la reception de API java
    //return this.get<Product>(`${this.endpoint}/${id}`);
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
