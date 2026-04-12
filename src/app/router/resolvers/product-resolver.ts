import {ResolveFn, Router} from '@angular/router';
import {Product} from '../../models/product-model';
import {inject} from '@angular/core';
import {ProductApiService} from '../../features/products/services/product-api.service';

export const productResolver: ResolveFn<Product> = async (route,state) => {
  const productApi = inject(ProductApiService);
  const router: Router = inject(Router);
  const id = +route.paramMap.get('id')!;

  const product = await productApi.getProductById(id);
  if(product == null){
    router.navigate(['/error'])
  }
  return product!;
};

// Précharge les données et récupère-les
// dans ProductDetailPage pour enfin les afficher dans ProductDetailCard.
