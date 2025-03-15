import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductCategory } from '../../../models/product.model';
import { GlobalCategoryService } from '../../../services/global-category.service';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent implements OnInit {
  constructor(private productService: ProductService, private globalCategoryService: GlobalCategoryService){}
  totalByCategory:number = 0
  currentCategory!:ProductCategory

  ngOnInit(): void {
    this.globalCategoryService.category$.subscribe(category=>{
      this.currentCategory = category
    })
    console.log(this.currentCategory);
    // se genera bugfix en servicio globalCategory
    // this.productService.getProductsByCategory(this.currentCategory)
  }

}
