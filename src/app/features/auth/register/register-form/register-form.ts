import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {ProfileFormModel} from '../../../../models/profile-form-model';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {BaseApi} from '../../../../shared/services/base.api';
import htmlString = JQuery.htmlString;
import {routes} from '../../../../router/app.routes';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm extends BaseApi{

  endpoint: string = "/e-shop/auth/register";
  private router: Router = inject(Router);

  hasMajuscule = false;
  hasMinicule = false;
  hasNumber = false;
  hasCarecter = false;
  hasPwdMinLenght = false;

  passwordRegex = '^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\\d))(?=(.*[\\W_]))[\\S]{6,}$';
  phoneRegex = '^(?:\\+33|0)[1-9](?:[\\s.-]?\\d{2}){4}$';
  passwordMatchValidator: ValidatorFn = (group: AbstractControl<FormGroup>): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return {passwordMismatch: true};
    }
    return null;
  }

  protected fb = inject(NonNullableFormBuilder);

  registerForm: FormGroup<ProfileFormModel> = this.fb.group({
    lastName: this.fb.control('', Validators.required),
    firstName: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6),
      Validators.pattern(this.passwordRegex)]),
    confirmPassword: this.fb.control('', [Validators.required]),
    phone: this.fb.control('',
      [Validators.pattern(this.phoneRegex)]),

    streetAddress: this.fb.control('',
      [Validators.required, Validators.minLength(5)]),

    city: this.fb.control('', [
      Validators.required,
      Validators.minLength(2)
    ]),
      postalCode: this.fb.control('',  [
        Validators.required,
        Validators.pattern(/^\d{5}$/) // code postal FR (5 chiffres)
      ]),
    country: this.fb.control('', Validators.required)
  }, {validators: this.passwordMatchValidator});


  checkPwdConstaint() {
    const pwd = this.registerForm.controls.password.value;
    if (pwd.match("[A-Z]+")){
      this.hasMajuscule = true;
    }else {
      this.hasMajuscule = false;
    }
    if (pwd.match("[a-z]+")){
      this.hasMinicule = true;
    }else {
      this.hasMinicule = false;
    }
    if (pwd.match("[0-9]+")){
      this.hasNumber = true;
    }else {
      this.hasNumber = false;
    }
    // à verifier
    if (pwd.match("[\*\-\+§%\$£€@#&|?%!;_]+")){
      this.hasCarecter = true;
    }else {
      this.hasCarecter = false;
    }
    if (pwd.length >= 6){
      this.hasPwdMinLenght = true;
    }else {
      this.hasPwdMinLenght = false;
    }

  }


  async createAccount() {
    localStorage.removeItem('token');
    const firstName = this.registerForm.controls.firstName.value;
    const lastName = this.registerForm.controls.lastName.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    const confirmPassword = this.registerForm.controls.confirmPassword.value;
    const phone = this.registerForm.controls.phone.value;
    const streetAddress = this.registerForm.controls.streetAddress.value;
    const city = this.registerForm.controls.city.value;
    const postalCode = this.registerForm.controls.postalCode.value;
    const country = this.registerForm.controls.country.value;


    const body = {
      customer : {
        firstName: firstName,
        lastName: lastName,
        phone: phone
      },
      user : {
        email: email,
        password: password
      },
      address: {
        street: streetAddress,
        city: city,
        zipCode: postalCode,
        country: country
      }

    }
    const result = await this.post(this.endpoint, body);
    console.log(result);
    await this.router.navigate(['/login']);
  }
}
