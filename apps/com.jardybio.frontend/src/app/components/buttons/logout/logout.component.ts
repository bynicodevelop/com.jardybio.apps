import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthFacade } from '../../../store/auth/auth.facade.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private authFacade: AuthFacade) {}

  protected logout(): void {
    this.authFacade.logout();
  }
}
