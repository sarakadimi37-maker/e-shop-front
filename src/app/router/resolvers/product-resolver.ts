import { ResolveFn } from '@angular/router';
import {Product} from '../../models/product-model';
import {inject} from '@angular/core';
import {ProductApiService} from '../../features/products/services/product-api.service';

export const productResolver: ResolveFn<Product> = async (route, state) => {
  const productApi = inject(ProductApiService);
  const id = +route.paramMap.get('id')!;
  const products = await productApi.getProducts();
  const product = products.find((product) => product.id === id);

  //console.log('format json de products =>' , JSON.stringify(products));
  // TODO plustard quand j'auraiu une api
  // return await productApi.getProductById(id);
  return product!;
};

// Précharge les données et récupère-les
// dans ProductDetailPage pour enfin les afficher dans ProductDetailCard.
