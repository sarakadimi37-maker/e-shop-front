import { Injectable } from '@angular/core';
import {User} from './models/User-model';
import {BaseApi} from './shared/services/base.api';
import {Costumer} from './models/costumer-model';

type AuthResponse = {
  userId: number;
  email: string;
  role: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class Auth extends BaseApi{

  endpoint: string = "/auth/login";
  customerEndpoint: string = "/customer";

  private user: User | undefined;

  isAuthenticated() {
  const check = localStorage.getItem('connected');
    return check != null;
  }

  async authenticate(login: string, password: string): Promise<boolean> {
    this.logout();
    const body = {
      email: login,
      password: password
    }

    const result = await this.post<AuthResponse>(this.endpoint, body);
    localStorage.setItem("token", result.token);
    console.log(result);
    const userId = result.userId;
    const urlCustomer = `${this.customerEndpoint}/${userId}`;
    const customer = await this.get<Costumer>(urlCustomer);
    console.log("customer ->" + customer);

    localStorage.setItem("customerId", String(customer.id));

    this.user = {
      id: 1,
      name : login,
      email:' test@test.fr',
      phone: '058743',
      website : '',
      username: login,
    }
    localStorage.setItem('connected', 'true');
    return true;
  }

  currentUser() {
    return this.user;
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('connected');
    localStorage.removeItem('token');
  }
}
