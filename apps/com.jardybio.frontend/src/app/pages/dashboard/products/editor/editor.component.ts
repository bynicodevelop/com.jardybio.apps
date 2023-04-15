import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  protected productId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    if (!this.route.snapshot.params['id']) {
      this.router.navigate(['/404']);
    }

    this.productId = this.route.snapshot.params['id'];
  }
}
