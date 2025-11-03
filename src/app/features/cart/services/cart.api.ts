import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {CartItemModel} from '../model/cart-item-model';

@Injectable({
  providedIn: 'root'
})
export class CartApi extends BaseApi{

  private readonly endpoint = '/cart';

  async getCarts(){
    console.log("api get cart");
   // return this.get<Cart[]>(this.endpoint)
  }
  // methodes persistances
  async createCart(cart: CartItemModel): Promise<CartItemModel> {
    console.log("api create cart product");
    //return this.post<CartItemModel>(this.endpoint, cart);
    return cart;
  }

  async deleteCart(id: number): Promise<void> {
    console.log("api delete cart product");
    //return this.delete(`${this.endpoint}/${id}`);
    return;
  }

  async updateCart(cart: CartItemModel): Promise<CartItemModel> {
    console.log("api update cart product");
    // return this.put<CartItemModel>(this.endpoint, cart);
    return cart;
  }



}
