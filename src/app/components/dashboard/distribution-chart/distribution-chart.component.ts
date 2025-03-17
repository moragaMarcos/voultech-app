import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { Product, ProductCategory, ProductState } from '../../../models/product.model';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { RecentProductsListComponent } from '../recent-products-list/recent-products-list.component';

@Component({
  selector: 'app-distribution-chart',
  imports: [NgxEchartsModule, RecentProductsListComponent],
  templateUrl: './distribution-chart.component.html',
  styleUrls: ['./distribution-chart.component.scss'],
  providers: [
    provideEchartsCore({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DistributionChartComponent implements OnInit, OnDestroy {
  initialStateProducts: Product[] = [];
  pendingStateProducts: Product[] = [];
  completeStateProducts: Product[] = [];
  chartOptions: EChartsOption = {};
  chartOptionsPie: EChartsOption = {};
  showLabel = false;
  currentCategory!: ProductCategory;
  trendData: { dates: string[]; series: { inicial: any[]; pendiente: any[]; completado: any[] } } = {
    dates: [],
    series: { inicial: [], pendiente: [], completado: [] }
  };

  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private globalCategoryService: GlobalCategoryService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.globalCategoryService.category$.subscribe((category) => {
        this.currentCategory = category;
        this.subscription.add(
          this.productService.getTrendData(category).subscribe((data) => {
            this.trendData = {
              dates: data.dates && data.dates.length ? data.dates : [],
              series: {
                inicial: data.series.inicial ? data.series.inicial : [],
                pendiente: data.series.pendiente ? data.series.pendiente : [],
                completado: data.series.completado ? data.series.completado : []
              }
            };
            this.updateCharts();
          })
        );

        this.subscription.add(
          this.productService.getProductsByStateAndCategory('inicial' as ProductState, category)
            .subscribe((products) => {
              this.initialStateProducts = products || [];
              this.updateCharts();
            })
        );

        this.subscription.add(
          this.productService.getProductsByStateAndCategory('pendiente' as ProductState, category)
            .subscribe((products) => {
              this.pendingStateProducts = products || [];
              this.updateCharts();
            })
        );

        this.subscription.add(
          this.productService.getProductsByStateAndCategory('completado' as ProductState, category)
            .subscribe((products) => {
              this.completeStateProducts = products || [];
              this.updateCharts();
            })
        );
      })
    );

    this.initChart();
  }

  updateCharts(): void {
    const dates = this.trendData.dates || [];
    const seriesInicial = this.trendData.series.inicial || [];
    const seriesPendiente = this.trendData.series.pendiente || [];
    const seriesCompletado = this.trendData.series.completado || [];

    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['inicial', 'pendiente', 'completado'] },
      toolbox: { feature: { saveAsImage: {} } },
      xAxis: { type: 'category', data: dates },
      yAxis: { type: 'value' },
      series: [
        { name: 'inicial', data: seriesInicial, type: 'line' },
        { name: 'pendiente', data: seriesPendiente, type: 'line' },
        { name: 'completado', data: seriesCompletado, type: 'line' }
      ]
    };

    this.chartOptionsPie = {
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      toolbox: { feature: { saveAsImage: {} } },
      series: [
        {
          name: this.currentCategory,
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.initialStateProducts.length, name: 'inicial' },
            { value: this.pendingStateProducts.length, name: 'pendiente' },
            { value: this.completeStateProducts.length, name: 'completado' }
          ],
          label: {show: false}
        }
      ]
    };
  }

  initChart(): void {
    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['inicial', 'pendiente', 'completado'],textStyle: {color: '#ffffff'} },
      toolbox: { feature: { saveAsImage: {} } },
      xAxis: { type: 'category', data: this.trendData.dates },
      yAxis: { type: 'value' },
      series: [
        { name: 'inicial', data: this.trendData.series.inicial, type: 'line' },
        { name: 'pendiente', data: this.trendData.series.pendiente, type: 'line' },
        { name: 'completado', data: this.trendData.series.completado, type: 'line' }
      ]
    };

    this.chartOptionsPie = {
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left', textStyle: {color: '#ffffff'} },
      toolbox: { feature: { saveAsImage: {} } },
      series: [
        {
          name: this.currentCategory,
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.initialStateProducts.length, name: 'inicial' },
            { value: this.pendingStateProducts.length, name: 'pendiente' },
            { value: this.completeStateProducts.length, name: 'completado' }
          ],
          label: {show: false}
        }
      ]
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
