import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductState } from '../../../models/product.model';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class KpiCardComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private globalCategoryService: GlobalCategoryService
  ) {}
  totalByCategory: number = 0;
  initialStateProducts: number = 0;
  pendingStateProducts: number = 0;
  completeStateProducts: number = 0;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.globalCategoryService.category$.subscribe(
      (category) => {
        this.productService
          .getProductsByCategory(category)
          .subscribe((products) => {
            this.totalByCategory = products.length;
          });
        this.productService
          .getProductsByStateAndCategory('inicial' as ProductState, category)
          .subscribe((products) => {
            this.initialStateProducts = products.length;
          });
        this.productService
          .getProductsByStateAndCategory('completado' as ProductState, category)
          .subscribe((products) => {
            this.completeStateProducts = products.length;
          });
        this.productService
          .getProductsByStateAndCategory('pendiente' as ProductState, category)
          .subscribe((products) => {
            this.pendingStateProducts = products.length;
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
