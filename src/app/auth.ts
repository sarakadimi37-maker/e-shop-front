import { Injectable } from '@angular/core';
import {User} from './models/User-model';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private user: User | undefined;

  isAuthenticated() {
  const check = localStorage.getItem('connected');
    return check != null;
  }

  authenticate(login: string) {
    this.user = {
      id: 1,
      name : login,
      email:' test@test.fr',
      phone: '058743',
      website : '',
      username: login,
    }
    localStorage.setItem('connected', 'true');
  }

  currentUser() {
    return this.user;
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('connected');
  }
}
