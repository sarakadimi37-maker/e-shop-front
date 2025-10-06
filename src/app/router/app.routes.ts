import {Routes} from '@angular/router';
import {HomePage} from './features/home/pages/home.page';

export const routes: Routes = [
  { path: '', component: HomePage},
  { path: 'products', loadComponent: () => import('./features/products/pages/product.page')},
  { path: 'products/:id', loadComponent: () => import('./features/products/pages/product-detail.page')},
  { path: 'admin', loadComponent: () => import('./core/pages/admin.page')},
  { path: 'about', loadComponent: ()=> import('./core/pages/about.page')},
  { path: 'settings', loadComponent: () =>import('./core/pages/setting.page')},
  { path: 'error', loadComponent: () => import('./core/pages/error.page')},
  { path: '**', redirectTo: 'error'}
];
