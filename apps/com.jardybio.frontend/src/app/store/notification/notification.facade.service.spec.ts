import { TestBed } from '@angular/core/testing';

import { NotificationFacade } from './notification.facade.service';

describe('NotificationFacade', () => {
  let service: NotificationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
