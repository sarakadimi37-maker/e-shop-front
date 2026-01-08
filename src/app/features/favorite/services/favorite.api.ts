import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../../../models/product-model';

export type FavoriteResponse = {
  id: number;
  product: Product;
}


@Injectable({
  providedIn: 'root'
})
export class FavoriteApi extends BaseApi{

  private readonly endpoint : string= '/favorite';
  private customerId = Number(localStorage.getItem('customerId'));
  async getFavorites(): Promise<Product[]>  {


    const favoriteUrl: string = `${this.endpoint}/${this.customerId}`;

    const response = await this.get<FavoriteResponse[]>(favoriteUrl);
    return response.map(favorite => favorite.product);
  }

  async deleteFavorite(productId: number) {
    console.log("api delete cart product");
    return this.delete<void>(`${this.endpoint}?customerId=${this.customerId}&productId=${productId}`);
  }

  async createFavorite(productId: number) {
    const body = {
      productId: productId,
      customerId: this.customerId,
    }
    return this.post(this.endpoint, body);
  }
}
