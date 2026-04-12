import {inject, Injectable, signal} from '@angular/core';
import {BaseApi} from '../../shared/services/base.api';
import {Costumer} from '../../models/costumer-model';
import {FavoriteStore} from '../favorite/services/favorite.store';
import {CartStore} from '../cart/services/cart.store';

type AuthResponse = {
  userId: number;
  email: string;
  role: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApi{

  private readonly TOKEN_KEY = 'token';
  private readonly CUSTOMER_ID = 'customerId';

  isAuthenticated = signal<boolean>(localStorage.getItem(this.TOKEN_KEY)!= null);

  endpoint: string = "/auth/login";
  customerEndpoint: string = "/customer";

  private favoriteStore = inject(FavoriteStore);

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  checkTokenOnAppStart(): void {
    const token = this.getToken();

    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  async authenticate(login: string, password: string): Promise<boolean> {
    this.logout();

    const body = {
      email: login,
      password: password
    }

    const result = await this.post<AuthResponse>(this.endpoint, body);
    localStorage.setItem(this.TOKEN_KEY, result.token);
    console.log(result);

    const userId = result.userId;
    const urlCustomer = `${this.customerEndpoint}/${userId}`;
    const customer = await this.get<Costumer>(urlCustomer);
    console.log("customer ->" + customer);

   // localStorage.setItem("customerId", String(customer.id));
    localStorage.setItem(this.CUSTOMER_ID, String(customer.id));
    this.isAuthenticated.set(true);

    return true;
  }


  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CUSTOMER_ID);
    this.isAuthenticated.set(false);
    this.favoriteStore.clearFavorites();
  }

  hasAdminRole(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const roles: string[] = payload.role ?? [];

      return roles.includes('ROLE_ADMIN');
    } catch (error) {
      console.error('Token invalide', error);
      return false;
    }
  }

}
