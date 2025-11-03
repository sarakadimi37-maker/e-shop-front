import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(localStorage.getItem('iLoveSalmon') != null) {
    console.log(localStorage.getItem('iLoveSalmon'));
    return true;
  }else {
    // redirection vers la page erreur
    return router.createUrlTree(['/error']);
  }

};
