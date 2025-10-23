import {Component, inject} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginFormModele} from '../../../models/login-form-modele';
import {Router, RouterLink} from '@angular/router';
import {Auth} from '../../../auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private router: Router = inject(Router);
  private auth = inject(Auth);
  fb = inject(NonNullableFormBuilder);

  loginForm: FormGroup<LoginFormModele> = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submit() {
    this.auth.authenticate(this.loginForm.controls['email'].value);
    this.router.navigate(['/']);
  }
}
