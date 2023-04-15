import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { LogoutComponent } from '../../buttons/logout/logout.component';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {}
