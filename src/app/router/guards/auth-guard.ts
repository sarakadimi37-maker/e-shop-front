import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(localStorage.getItem('iLoveSalmon') != null) {
    console.log(localStorage.getItem('iLoveSalmon'));
    return true;
  }else {
    return router.createUrlTree(['/error']);
  }

};
