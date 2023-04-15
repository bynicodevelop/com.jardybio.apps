import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { NotificationEntity } from '../../models/notification';
import { createNotification, deleteNotification } from './notification.actions';
import { getNotification } from './notification.selectors';

@Injectable({
  providedIn: 'root',
})
export class NotificationFacade {
  constructor(private storeNotification: Store) {}

  createNotification(messages: string[]) {
    return this.storeNotification.dispatch(createNotification({ messages }));
  }

  deleteNotification(): void {
    this.storeNotification.dispatch(deleteNotification());
  }

  getNotification(): Observable<NotificationEntity> {
    return this.storeNotification.select(getNotification);
  }
}
