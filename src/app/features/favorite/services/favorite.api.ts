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

  async getFavorites(): Promise<Product[]>  {

    const customerId = this.getCustomerId();
    const favoriteUrl: string = `${this.endpoint}/${customerId}`;
    const response = await this.get<FavoriteResponse[]>(favoriteUrl);
    return response.map(favorite => favorite.product);
  }

  async deleteFavorite(productId: number) {

    const customerId = this.getCustomerId();
    console.log("api delete cart product");
    return this.delete<void>(`${this.endpoint}?customerId=${customerId}&productId=${productId}`);
  }

  async createFavorite(productId: number) {

    const customerId = this.getCustomerId();
    const body = {
      productId: productId,
      customerId: customerId,
    }
    return this.post(this.endpoint, body);
  }

  private getCustomerId() {
    return Number(localStorage.getItem('customerId'));
  }
}
