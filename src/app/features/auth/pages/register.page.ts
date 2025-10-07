import { Component } from '@angular/core';
import {RegisterForm} from '../register/register-form/register-form';

@Component({
  selector: 'app-register.page',
  imports: [
    RegisterForm
  ],
  template: `
    <app-register-form></app-register-form>
  `,
  styles: ``
})
export default class RegisterPage {

}
