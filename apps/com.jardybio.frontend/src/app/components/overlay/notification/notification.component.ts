import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { first } from 'rxjs';

import { PushModule } from '@ngrx/component';
import { getMessage } from '@packages/messages';

import { NotificationEntity } from '../../../models/notification';
import { NotificationFacade } from '../../../store/notification/notification.facade.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [PushModule, NgFor, NgIf],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  timeout?: NodeJS.Timeout;

  messages$ = this.notificationFacade.getNotification();

  constructor(private notificationFacade: NotificationFacade) {}

  ngOnInit(): void {
    this.messages$
      .pipe(first())
      .subscribe((messages: NotificationEntity): void => {
        if (this.timeout) clearTimeout(this.timeout);

        if (messages?.messages?.length > 0) {
          this.timeout = setTimeout((): void => {
            this.notificationFacade.deleteNotification();
            clearTimeout(this.timeout);
          }, 5000);
        }
      });
  }

  onClose(): void {
    this.notificationFacade.deleteNotification();
    if (this.timeout) clearTimeout(this.timeout);
  }

  convertToText(messageKey: string): string {
    return getMessage(messageKey);
  }
}
