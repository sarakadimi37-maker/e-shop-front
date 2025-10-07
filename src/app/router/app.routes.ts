import {Routes} from '@angular/router';
import {HomePage} from '../features/home/pages/home.page';
import {authGuard} from './guards/auth-guard';
import {productsResolver} from './resolvers/products-resolver';

export const routes: Routes = [
  { path: '', component: HomePage},
  { path: 'products', loadComponent: () => import('../features/products/pages/product.page'), resolve: {myProducts : productsResolver}},
  { path: 'products/:id', loadComponent: () => import('../features/products/pages/product-detail.page')},
  { path: 'admin', loadComponent: () => import('../core/pages/admin.page'), canActivate: [authGuard]},
  { path: 'about', loadComponent: ()=> import('../core/pages/about.page')},
  { path: 'register', loadComponent:()=>import('../features/auth/pages/register.page')},
  { path: 'login', loadComponent:()=>import('../features/auth/pages/login.page')},
  { path: 'settings', loadComponent: () =>import('../core/pages/setting.page')},
  { path: 'error', loadComponent: () => import('../core/pages/error.page')},
  { path: '**', redirectTo: 'error'}
];
