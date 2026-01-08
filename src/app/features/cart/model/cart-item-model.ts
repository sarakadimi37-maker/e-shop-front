import {Product} from '../../../models/product-model';

export type CartItemModel = {
  orderItemId?: number;
  product: Product;
  quantity: number;
}
