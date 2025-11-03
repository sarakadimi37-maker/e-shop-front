import {Component, inject, OnInit, signal} from '@angular/core';
import {Footer} from './core/components/footer/footer';
import {Header} from './core/components/header/header';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {ToastError} from './shared/components/toast-error';
import {GlobalSpinner} from './core/components/global-spinner';
import {ShowNotification} from './shared/components/show-notification.component';
import {FavoriteFacade} from './features/favorite/services/favorite.facade';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet, ToastError, GlobalSpinner, ShowNotification],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('e-shop');
  loading = false;

  favoriteFacade = inject(FavoriteFacade);

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
  }

  isConnected(): boolean {
    return localStorage.getItem("connected") !== null;
  }

  ngOnInit() {
    this.favoriteFacade.loadFavorite();
  }

}
