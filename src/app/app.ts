import {Component, inject, OnInit, signal, effect} from '@angular/core';
import {Footer} from './core/components/footer/footer';
import {Header} from './core/components/header/header';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {ToastError} from './shared/components/toast-error';
import {GlobalSpinner} from './core/components/global-spinner';
import {ShowNotification} from './shared/components/show-notification.component';
import {FavoriteFacade} from './features/favorite/services/favorite.facade';
import {filter} from 'rxjs';
import {AuthService} from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet, ToastError, GlobalSpinner, ShowNotification],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('e-shop');

  loading = false;
  isHomePage = false;

  favoriteFacade = inject(FavoriteFacade);
  authService: AuthService = inject(AuthService);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Navigation start');
        this.loading = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        console.log('Navigation end');
        this.loading = false;

      }
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.urlAfterRedirects === '/';
      });


  }



  ngOnInit() {
    this.authService.checkTokenOnAppStart();
    if (this.authService.isLoggedIn()) {
      this.favoriteFacade.loadFavorite();
    }
  }



}
