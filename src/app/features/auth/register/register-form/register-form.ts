import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {ProfileFormModel} from '../../../../models/profile-form-model';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm {
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


}
