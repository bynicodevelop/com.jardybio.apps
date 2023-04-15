import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ProductsFacade } from 'apps/com.jardybio.frontend/src/app/store/products/products.facade.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private productsFacade: ProductsFacade) {
    this.createForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      console.log('Formulaire soumis:', this.createForm.value);

      this.productsFacade.createProduct(this.createForm.value);
    }
  }
}
