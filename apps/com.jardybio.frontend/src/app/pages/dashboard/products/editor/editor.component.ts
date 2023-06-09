import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ProductsFacade } from 'apps/com.jardybio.frontend/src/app/store/products/products.facade.service';

import { LetModule, PushModule } from '@ngrx/component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, PushModule, NgFor, LetModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  protected product$ = this.productsFacade.product$;

  protected productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsFacade: ProductsFacade
  ) {
    if (!this.route.snapshot.params['productId']) {
      this.router.navigate(['/404']);
    }

    this.productId = this.route.snapshot.params['productId'];
  }

  ngOnInit(): void {
    this.productsFacade.getProduct(this.productId);
  }
}
