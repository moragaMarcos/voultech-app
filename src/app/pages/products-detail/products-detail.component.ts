import { Component } from '@angular/core';
import { ProductDetailComponent } from "../../components/products/product-detail/product-detail.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { GlobalCategoryService } from '../../services/global-category.service';

@Component({
  selector: 'app-products-detail',
  imports: [ProductDetailComponent, CommonModule, RouterLink],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  product: Product | undefined;
  category!:ProductCategory
  constructor(
    private route: ActivatedRoute, 
    private productService:ProductService,
    private globalCategoryService:GlobalCategoryService) {}

  ngOnInit() {
    this.productService.getProductById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(product=>{
      this.product = product
    })
    this.globalCategoryService.category$.subscribe(category=>{
      this.category = category
    })
  }
}
