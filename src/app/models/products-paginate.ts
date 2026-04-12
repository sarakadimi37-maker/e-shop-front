import {Product} from './product-model';

export type ProductsPaginate = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  content:Product[];
}
