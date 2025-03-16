import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-recent-products-card',
  imports: [],
  templateUrl: './recent-products-card.component.html',
  styleUrl: './recent-products-card.component.scss'
})
export class RecentProductsCardComponent {
  @Input() producto!:Product
}
