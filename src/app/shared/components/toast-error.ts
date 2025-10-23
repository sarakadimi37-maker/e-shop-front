import {Component, inject} from '@angular/core';
import {ErrorService} from '../../core/services/error.service';

@Component({
  selector: 'app-toast-error',
  imports: [],
  template: `
    @if (errorSignal()){
      <div class="banner">
        <p>{{ errorSignal() }}</p>
        <button (click)="errorSignal.set(null)">x</button>
      </div>
    }
  `,
  styles: [`div { background:red; color:white; padding:0.5rem; }`]
})
export class ToastError {
  errorSignal = inject(ErrorService).error;
}
