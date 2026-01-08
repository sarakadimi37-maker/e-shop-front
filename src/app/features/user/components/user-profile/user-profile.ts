import {Component, inject} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../../models/User-model';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export default class UserProfile {
// injection de service AuthService
  auth = inject(AuthService);
  router = inject(Router);
  private user: User | undefined;

  currentUser() {
    return this.user;
  }

  // Méthode du composant, liée au template
  logout(): void {
    this.auth.logout();// Appel de la méthode du service, liée à la logique
  }

  showLogin() {
    this.router.navigate(['/login']);
  }
}
