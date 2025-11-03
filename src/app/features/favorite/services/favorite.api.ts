import { Injectable } from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {Product} from '../../../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteApi extends BaseApi{

  private readonly endpoint : string= '/favorites.json';

  async getFavorites(): Promise<Product[]>  {
    return this.get<Product[]>(this.endpoint);
  }

  async deleteFavorite(id: number) {
    console.log("api delete cart product");
   // return this.delete<void>(`${this.endpoint}/${id}`);
    return;
  }
}
