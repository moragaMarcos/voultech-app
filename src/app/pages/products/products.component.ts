import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "../../components/products/product-list/product-list.component";
import { GlobalCategoryService } from '../../services/global-category.service';
import { ProductCategory } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductListComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  category!:ProductCategory
  constructor(private globalCategoryService:GlobalCategoryService){}
  ngOnInit(){
    this.globalCategoryService.category$.subscribe(category=>{
      this.category = category
    })
  }
}
