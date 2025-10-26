import {Injectable, signal} from '@angular/core';

export enum NotificationType {
  success = 'success',
  warning = 'warning',
  danger = 'danger'
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message = signal<string|null>(null);
  messageType = signal<NotificationType |null>(null);

  private notify(message: string, messageType: NotificationType) {
    this.message.set(message);
    this.messageType.set(messageType);
    this.clearMsgAfter(3000);
  }

  showSuccess(message: string) {
    this.notify(message, NotificationType.success);
  }

  showWarning(message: string) {
    this.notify(message, NotificationType.warning);
  }

  showError(message: string) {
    this.notify(message, NotificationType.danger);
  }

  clearMsgAfter(miliSecend: number) {
    setTimeout(() => {
      this.message.set(null);
      this.messageType.set(null);
    }, miliSecend);
  }

}
