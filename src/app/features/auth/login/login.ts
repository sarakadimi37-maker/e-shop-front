import {Component, inject} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginFormModele} from '../../../models/login-form-modele';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {FavoriteFacade} from '../../favorite/services/favorite.facade';

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

  private favoriteFacade = inject(FavoriteFacade);
  private router: Router = inject(Router);
  private authService  = inject(AuthService);
  fb = inject(NonNullableFormBuilder);

  loginForm: FormGroup<LoginFormModele> = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  async submit() {
    const login = this.loginForm.controls['email'].value;
    const pwd = this.loginForm.controls['password'].value;
    const result: boolean = await this.authService.authenticate(login, pwd);
    if(result) {
      this.favoriteFacade.loadFavorite();
      this.router.navigate(['/']);
    }else{
      // todo
      console.error('Unable to authenticate');
    }

  }
}
