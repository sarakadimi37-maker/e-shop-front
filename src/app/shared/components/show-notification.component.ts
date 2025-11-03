import {Component, inject} from '@angular/core';
import {ErrorService} from '../../core/services/error.service';
import {NotificationService, NotificationType} from '../services/notification.service';

@Component({
  selector: 'app-show-notification',
  imports: [],
  template: `
    @if (notification.messageType() === NotificationType.success){
      <div class="success">
        <p>{{ notification.message() }}</p>
      </div>
    }
    @if (notification.messageType() === NotificationType.warning){
      <div class="warning">
        <p>{{ notification.message() }}</p>
      </div>
    }
    @if (notification.messageType() === NotificationType.danger){
      <div class="danger">
        <p>{{ notification.message() }}</p>
      </div>
    }

  `,
  styles: [`.success {width:100%; background:green; color:white; z-index: 1; }`,
    `.warning { width:100%; background:orangered; color:white;  z-index: 1;}`,
    `.danger { width:100%; background:darkred; color:white; z-index: 1; }`]
})
export class ShowNotification {
  notification: NotificationService = inject(NotificationService);
  protected readonly NotificationType = NotificationType;
}
