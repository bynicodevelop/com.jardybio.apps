import { Component } from '@angular/core';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
})
export class AllProductComponent {
  products: { id: number; name: string }[] = [
    { id: 1, name: 'Produit 1' },
    { id: 2, name: 'Produit 2' },
    { id: 3, name: 'Produit 3' },
  ];
}
