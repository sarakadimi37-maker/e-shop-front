import {Component, inject} from '@angular/core';
import {Auth} from '../../../../auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {
// injection de service Auth
  auth = inject(Auth);
  router = inject(Router);

  // Méthode du composant, liée au template
  logout(): void {
    this.auth.logout();// Appel de la méthode du service, liée à la logique
  }

  showLogin() {
    this.router.navigate(['/login']);
  }
}
