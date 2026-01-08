
import {CartItemModel} from '../../features/cart/model/cart-item-model';

export interface OrderResponse {
  totalItems:  number;
  totalPages:  number;
  currentPage: number;
  content:     Content[];
}

export interface Content {
  status:     string;
  orderItems: CartItemModel[];
}

