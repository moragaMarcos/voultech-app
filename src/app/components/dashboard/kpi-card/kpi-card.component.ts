import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductCategory } from '../../../models/product.model';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent implements OnInit {
  constructor(private productService: ProductService, private globalCategoryService: GlobalCategoryService){}
  totalByCategory:number = 0
  private subscription!: Subscription

  ngOnInit(): void {
   this.subscription = this.globalCategoryService.category$.subscribe(category=>{
      this.totalByCategory = this.productService.getProductsByCategory(category).length
    })
    
    // se genera bugfix en servicio globalCategory
    // this.productService.getProductsByCategory(this.currentCategory)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
