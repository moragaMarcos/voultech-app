import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { Product, ProductState } from '../../../models/product.model';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-distribution-chart',
  imports: [NgxEchartsModule],
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
  private data: number[] = [];
  private labels: string[] = [];
  showLabel = false;

  private subscription!: Subscription
  option = {
   
  };
  ngOnInit(): void {
   this.subscription = this.globalCategoryService.category$.subscribe(category=>{
      this.initialStateProducts = this.productService.getProductsByStateAndCategory('inicial' as ProductState, category)
      this.completeStateProducts = this.productService.getProductsByStateAndCategory('completado' as ProductState, category)
      this.pendingStateProducts = this.productService.getProductsByStateAndCategory('pendiente' as ProductState, category)
    })
   this.initChart()
  }
  initChart(): void {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Activos', 'Pendientes', 'Completos']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: "Activos",
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        },
        { 
          name: "Pendientes",
          data: [22, 14, 43, 54, 71, 85, 80],
          type: 'line'
        },
        { 
          name: "Completos",
          data: [2, 0, 0, 5, 6, 5, 2],
          type: 'line'
        }
      ],
    };
    this.chartOptionsPie = {
      title: {
        text: 'Clasify Distribution',
        subtext: 'Fake Data',
        left: 'center'
      },
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
          name: 'Nootebooks',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 104, name: 'Activos' },
            { value: 73, name: 'Pendientes' },
            { value: 58, name: 'Completos' },
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
