import {Component, inject} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginFormModele} from '../../../models/login-form-modele';
import {Router, RouterLink} from '@angular/router';

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

fb = inject(NonNullableFormBuilder);

  loginForm: FormGroup<LoginFormModele> = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submit() {
    localStorage.setItem('connected', 'true');
    this.router.navigate(['/']);
  }
}
