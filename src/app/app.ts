import {Component, signal} from '@angular/core';
import {Footer} from './core/components/footer/footer';
import {Header} from './core/components/header/header';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {ToastError} from './shared/components/toast-error';
import {GlobalSpinner} from './core/components/global-spinner';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet, ToastError, GlobalSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('e-shop');
  loading = false;


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

  protected readonly localStorage = localStorage;

  isConnected(): boolean {
    return localStorage.getItem("connected") !== null;
  }
}
