import {Routes} from '@angular/router';
import {HomePage} from '../features/home/pages/home.page';
import {authGuard} from './guards/auth-guard';
import {productResolver} from './resolvers/product-resolver';

export const routes: Routes = [
  { path: '', component: HomePage},
  { path: 'products', loadComponent: () => import('../features/products/pages/product.page')},
  { path: 'products/:id', loadComponent: () => import('../features/products/pages/product-detail.page'), resolve: {myProduct : productResolver}},
  { path: 'admin', loadComponent: () => import('../core/pages/admin.page'), canActivate: [authGuard]},
  { path: 'cart', loadComponent: ()=> import('../features/cart/pages/cart.page')},
  { path: 'favorite', loadComponent: ()=> import('../features/favorite/pages/favorite.page')},
  { path: 'about', loadComponent: ()=> import('../core/pages/about.page')},
  { path: 'register', loadComponent:()=>import('../features/auth/pages/register.page')},
  { path: 'login', loadComponent:()=>import('../features/auth/pages/login.page')},
  { path: 'settings', loadComponent: () =>import('../core/pages/setting.page')},
  { path: 'error', loadComponent: () => import('../core/pages/error.page')},
  { path: '**', redirectTo: 'error'}
];
