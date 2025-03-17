import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { RecentProductsCardComponent } from "../recent-products-card/recent-products-card.component";

@Component({
  selector: 'app-recent-products-list',
  imports: [CommonModule, RecentProductsCardComponent],
  templateUrl: './recent-products-list.component.html',
  styleUrl: './recent-products-list.component.scss'
})
export class RecentProductsListComponent implements OnInit {
  products: Product[] = []
  constructor(private productService:ProductService, private globalCategoryService:GlobalCategoryService){}
  ngOnInit(): void {
    this.globalCategoryService.category$.subscribe(category=>{
     this.productService.getProductsToday(category).subscribe(products=>{
      this.products = products.slice(0,5)
     })
    })
  }
}
