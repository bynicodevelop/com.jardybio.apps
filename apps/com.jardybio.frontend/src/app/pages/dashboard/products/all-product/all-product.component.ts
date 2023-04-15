import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ProductsFacade } from 'apps/com.jardybio.frontend/src/app/store/products/products.facade.service';

import { PushModule } from '@ngrx/component';

@Component({
  standalone: true,
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
  imports: [PushModule, NgIf, NgFor],
})
export class AllProductComponent implements OnInit {
  products$ = this.productFacade.products$;

  constructor(private productFacade: ProductsFacade) {}

  ngOnInit(): void {
    this.productFacade.loadProducts();
  }
}
