import { Component } from '@angular/core';
import { ProductDetailComponent } from "../../components/products/product-detail/product-detail.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  imports: [ProductDetailComponent, CommonModule, RouterLink],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService:ProductService) {}

  ngOnInit() {
    this.product = this.productService.getProductById(Number(this.route.snapshot.paramMap.get('id')))
  }
}
