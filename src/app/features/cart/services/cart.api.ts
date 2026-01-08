import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/services/base.api';
import {CartItemModel} from '../model/cart-item-model';
import {OrderRequest} from '../../../models/request/order-request-model';
import {OrderResponse} from '../../../models/response/OrderResponse';

@Injectable({
  providedIn: 'root'
})
export class CartApi extends BaseApi{

  private readonly endpoint = '/orders';

  async getCarts(){
    console.log("api get cart");
    const urlCustomer = `${this.endpoint}?customerId=${localStorage.getItem('customerId')}`;
    const response = await this.get<OrderResponse>(urlCustomer);
    if(response.totalItems > 0){
      return response.content[0].orderItems;
    }
    return [];
  }
  // methodes persistances
  async createCart(cart: CartItemModel): Promise<CartItemModel> {
    console.log("api create cart product");
    //return this.post<CartItemModel>(this.endpoint, cart);
    return cart;
  }

  async deleteCart(orderItemId: number): Promise<void> {
    console.log("api delete cart product");

    return this.delete(`${this.endpoint}/item/${orderItemId}`);
  }

  async updateCart(cart: CartItemModel): Promise<CartItemModel> {
    console.log("api update cart product");
    // return this.put<CartItemModel>(this.endpoint, cart);
    return cart;
  }


  async createUpdateCart(productId: number, qtOfBuy: number): Promise<void> {

    const orderRequest: OrderRequest = {
      status : "PENDING",
      item: {
        productId: productId,
        quantity: qtOfBuy
      }
    }
    const url = `${this.endpoint}/${localStorage.getItem("customerId")}`;
    await this.post(url, orderRequest);

  }

}
