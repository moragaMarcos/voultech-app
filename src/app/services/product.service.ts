import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCategory, ProductState } from '../models/product.model';
import { ProductStorageService } from './product-storage.service';
import { TrendData, TrendSeries } from '../models/trend-data.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject: BehaviorSubject<Product[]> 

  constructor(private productStorage: ProductStorageService) {
    this.productsSubject = new BehaviorSubject<Product[]>(this.productStorage.getProducts());
  }

  private refreshProducts(): void {
    this.productsSubject.next(this.productStorage.getProducts());
  }

  createProduct(product: Product): void {
    this.productStorage.createProduct(product);
    this.refreshProducts();
  }

  updateProduct(productId: number, productBody: Partial<Product>): void {
    this.productStorage.updateProduct(productId, productBody);
    this.refreshProducts();
  }

  deleteProduct(productId: number): void {
    this.productStorage.deleteProduct(productId);
    this.refreshProducts();
  }

  get products$(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.products$.pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(product => product.category === category))
    );
  }

  getProductsByStateAndCategory(state: ProductState, category: ProductCategory): Observable<Product[]> {
    return this.getProductsByCategory(category).pipe(
      map(products => products.filter(product => product.state === state))
    );
  }

  getTrendData(category: ProductCategory): Observable<TrendData> {
    return this.getProductsByCategory(category).pipe(
      map(products => {
        const trendMap: { [date: string]: { 
          inicial: { name: string, category: string }[],
          pendiente: { name: string, category: string }[],
          completado: { name: string, category: string }[]
        } } = {};

        products.forEach(product => {
          const dateStr = new Date(product.creationDate).toLocaleDateString('es-ES');
          if (!trendMap[dateStr]) {
            trendMap[dateStr] = { inicial: [], pendiente: [], completado: [] };
          }
          const info = { name: product.name, category: product.category };
          trendMap[dateStr][product.state].push(info);
        });

        const dates = Object.keys(trendMap).sort((a, b) => {
          const [dayA, monthA, yearA] = a.split('/').map(Number);
          const [dayB, monthB, yearB] = b.split('/').map(Number);
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);
          return dateA.getTime() - dateB.getTime();
        });

        const seriesInicial: TrendSeries[] = dates.map(date => ({
          value: trendMap[date].inicial.length,
          details: trendMap[date].inicial
        }));

        const seriesPendiente: TrendSeries[] = dates.map(date => ({
          value: trendMap[date].pendiente.length,
          details: trendMap[date].pendiente
        }));

        const seriesCompletado: TrendSeries[] = dates.map(date => ({
          value: trendMap[date].completado.length,
          details: trendMap[date].completado
        }));

        return {
          dates,
          series: {
            inicial: seriesInicial,
            pendiente: seriesPendiente,
            completado: seriesCompletado
          }
        };
      })
    );
  }

  getProductsByDate(dateFrom: Date, dateTo: Date, category: ProductCategory): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(product =>
        product.creationDate >= dateFrom &&
        product.creationDate <= dateTo &&
        product.category === category
      ))
    );
  }


  getProductsToday(category: ProductCategory): Observable<Product[]> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return this.getProductsByDate(startOfDay, endOfDay, category);
  }

  getProductsLast7Days(category: ProductCategory): Observable<Product[]> {
    const today = new Date();
    const dateFrom = new Date(today);
    dateFrom.setDate(today.getDate() - 7);
    return this.getProductsByDate(dateFrom, today, category);
  }

  getProductsLast30Days(category: ProductCategory): Observable<Product[]> {
    const today = new Date();
    const dateFrom = new Date(today);
    dateFrom.setDate(today.getDate() - 30);
    return this.getProductsByDate(dateFrom, today, category);
  }
}
