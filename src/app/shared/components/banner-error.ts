import {Component, inject} from '@angular/core';
import {ErrorService} from '../../core/services/error.service';

@Component({
  selector: 'app-banner-error',
  imports: [],
  template: `
    @if (error()){
      <div class="banner">
        <p>{{ error() }}</p>
        <button (click)="error.set(null)">x</button>
      </div>
    }
  `,
  styles: [`.banner { position:fixed; top:0; width:100%; background:darkred; color:white; }`]
})
export class BannerError {
  error = inject(ErrorService).error;
}
