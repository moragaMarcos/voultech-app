import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { Product, ProductCategory, ProductState } from '../../../models/product.model';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { RecentProductsListComponent } from "../recent-products-list/recent-products-list.component";

@Component({
  selector: 'app-distribution-chart',
  imports: [NgxEchartsModule, RecentProductsListComponent],
  templateUrl: './distribution-chart.component.html',
  styleUrl: './distribution-chart.component.scss',
  providers: [
    provideEchartsCore({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DistributionChartComponent {
  constructor(private productService: ProductService, private globalCategoryService: GlobalCategoryService){}
  initialStateProducts: Product[] = []
  pendingStateProducts: Product[] = []
  completeStateProducts: Product[] = []
  chartOptions: EChartsOption = {};
  chartOptionsPie: EChartsOption = {};
  showLabel = false;
  currentCategory!: ProductCategory
  private subscription!: Subscription
  trendData:any

  ngOnInit(): void {
    this.subscription = this.globalCategoryService.category$.subscribe(category=>{
      this.trendData = this.productService.getTrendData(category)
      this.currentCategory = category
      this.initialStateProducts = this.productService.getProductsByStateAndCategory('inicial' as ProductState, category)
      this.completeStateProducts = this.productService.getProductsByStateAndCategory('completado' as ProductState, category)
      this.pendingStateProducts = this.productService.getProductsByStateAndCategory('pendiente' as ProductState, category)
      this.updateCharts()
    })
    
   this.initChart()
  }
  updateCharts(): void{
    this.chartOptions = { ...this.chartOptions, series: [{
      name: "inicial",
      data: this.trendData.series.inicial,
      type: 'line'
    },
    { 
      name: "pendiente",
      data: this.trendData.series.pendiente,
      type: 'line'
    },
    { 
      name: "completado",
      data: this.trendData.series.completado,
      type: 'line'
    }] };
    this.chartOptionsPie = { ...this.chartOptionsPie, series: [{
      name: this.currentCategory ,
      type: 'pie',
      radius: '50%',
      data: [
        { value: this.initialStateProducts.length, name: 'inicial' },
        { value: this.pendingStateProducts.length, name: 'pendiente' },
        { value: this.completeStateProducts.length, name: 'completado' },
      ],
      label: this.showLabel
        ? {
            show: true,
            formatter: '{b}: {c} ({d}%)',
            position: 'outside'
          }
        : {
            show: false 
          },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }] };
  }
  initChart(): void {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['inicial', 'pendiente', 'completado']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: this.trendData.dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: "inicial",
          data: this.trendData.series.inicial,
          type: 'line'
        },
        { 
          name: "pendiente",
          data: this.trendData.series.pendiente,
          type: 'line'
        },
        { 
          name: "completado",
          data: this.trendData.series.completado,
          type: 'line'
        }
      ],
    };
    this.chartOptionsPie = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: this.currentCategory ,
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.initialStateProducts.length, name: 'inicial' },
            { value: this.pendingStateProducts.length, name: 'pendiente' },
            { value: this.completeStateProducts.length, name: 'completado' },
          ],
          label: this.showLabel
            ? {
                show: true,
                formatter: '{b}: {c} ({d}%)',
                position: 'outside'
              }
            : {
                show: false 
              },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
      ]
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
