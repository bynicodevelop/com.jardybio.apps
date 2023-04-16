import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsFacade } from 'apps/com.jardybio.frontend/src/app/store/products/products.facade.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  protected product$ = this.productsFacade.products$;

  protected productId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsFacade: ProductsFacade
  ) {
    if (!this.route.snapshot.params['id']) {
      this.router.navigate(['/404']);
    }

    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productsFacade.getProduct(this.productId);
  }
}
