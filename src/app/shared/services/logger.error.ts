import {effect, inject, Injectable} from '@angular/core';
import {ErrorService} from '../../core/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerError {
  constructor() {
    const errorService = inject(ErrorService);
    effect(() => {
      const err = errorService.error();
      if(err){
        console.log('sent to Sentry: ', err);
      }
    });
  }
}
