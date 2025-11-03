import {Product} from '../../../models/product-model';

export type CartItemModel = {
  product: Product,
  quantity: number;
}
