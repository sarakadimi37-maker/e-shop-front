import { Component } from '@angular/core';
import {Login} from '../login/login';

@Component({
  selector: 'app-login.page',
  imports: [
    Login
  ],
  template: `
    <app-login></app-login>
    <p>
      login.page works!
    </p>
  `,
  styles: ``
})
export default class LoginPage {

}
