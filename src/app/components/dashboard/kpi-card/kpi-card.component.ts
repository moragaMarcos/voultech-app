import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductState } from '../../../models/product.model';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent implements OnInit {
  constructor(
    private productService: ProductService, 
    private globalCategoryService: GlobalCategoryService,
  ){}
  totalByCategory:number = 0
  initialStateProducts: number = 0
  pendingStateProducts: number = 0
  completeStateProducts: number = 0
  private subscription!: Subscription

  ngOnInit(): void {
   this.subscription = this.globalCategoryService.category$.subscribe(category=>{
      this.totalByCategory = this.productService.getProductsByCategory(category).length
      this.initialStateProducts = this.productService.getProductsByStateAndCategory('inicial' as ProductState, category).length
      this.completeStateProducts = this.productService.getProductsByStateAndCategory('completado' as ProductState, category).length
      this.pendingStateProducts = this.productService.getProductsByStateAndCategory('pendiente' as ProductState, category).length
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
