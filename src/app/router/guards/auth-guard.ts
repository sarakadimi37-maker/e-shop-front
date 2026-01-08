import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../features/auth/auth.service';

export const authGuard: CanActivateFn =
  (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  // todo verification de role si c'est admin affiche la page admin
  if(authService.isAuthenticated()) {
    return true;
  }else {
    // redirection vers la page erreur
    return router.createUrlTree(['/error']);
  }

};
