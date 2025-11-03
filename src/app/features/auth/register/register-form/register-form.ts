import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {ProfileFormModel} from '../../../../models/profile-form-model';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

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
export class RegisterForm {
  hasMajuscule = false;
  hasMinicule = false;
  hasNumber = false;
  hasCarecter = false;
  hasPwdMinLenght = false;

  passwordRegex = '^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\\d))(?=(.*[\\W_]))[\\S]{6,}$';
  phoneRegex = '^\\+(\\d{1,3})[\\s\\-\\(\\)]?(\\d{1,4})[\\s\\-\\(\\)]?(\\d{1,4})[\\s\\-\\(\\)]?(\\d{1,4})$';
  passwordMatchValidator: ValidatorFn = (group: AbstractControl<FormGroup>): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return {passwordMismatch: true};
    }
    return null;
  }

  protected fb = inject(NonNullableFormBuilder);
  addresses = this.fb.array([
    this.fb.control('', [Validators.required]),
  ]);

  registerForm: FormGroup<ProfileFormModel> = this.fb.group({
    username: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6),
      Validators.pattern(this.passwordRegex)]),
    confirmPassword: this.fb.control('', [Validators.required]),
    phone: this.fb.control('', [Validators.required, Validators.pattern(this.phoneRegex)]),
    addresses: this.addresses,
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


}
