import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductState } from '../models/product.model';
import { ProductStorageService } from './product-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productStorage:ProductStorageService) { }

  createProduct(product:Product){
    this.productStorage.createProduct(product)
  }
  getProductById(id:number):Product | undefined {
   const product = this.getProducts().find(product=>product.id === id)
   if(!product) return undefined
   return product
  }
  updateProduct(productId:number, productBody: Partial<Product>){
    this.productStorage.updateProduct(productId, productBody)
  }
  deleteProduct(productId:number){
    this.productStorage.deleteProduct(productId)
  }
  getProducts():Product[]{
   return this.productStorage.getProducts()
  }

  getProductsByCategory(category:ProductCategory):Product[]{
    const products = this.productStorage.getProducts()
    return products.filter(product=> product.category === category) || []
  }

  getProductsByStateAndCategory(state:ProductState, category:ProductCategory){
    return this.getProductsByCategory(category).filter(product=>product.state === state) || []
  }

  getTrendData(category:ProductCategory){
    const products = this.getProductsByCategory(category);
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
  
    const seriesInicial = dates.map(date => ({
      value: trendMap[date].inicial.length,
      details: trendMap[date].inicial
    }));
  
    const seriesPendiente = dates.map(date => ({
      value: trendMap[date].pendiente.length,
      details: trendMap[date].pendiente
    }));
  
    const seriesCompletado = dates.map(date => ({
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
  }
  
  getProductsByDate(dateFrom:Date, dateTo:Date, category:ProductCategory){
    const products = this.getProducts();
    return products.filter(product =>
      product.creationDate >= dateFrom &&
      product.creationDate <= dateTo &&
      product.category === category
    );
  }
  getProductsToday(category:ProductCategory){
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return this.getProductsByDate(startOfDay, endOfDay, category);
  }
  getProductsLast7Days(category:ProductCategory){
    const today = new Date();
    const dateFrom = new Date(today);
    dateFrom.setDate(today.getDate() - 7);
    return this.getProductsByDate(dateFrom, today, category);
  }
  getProductsLast30Days(category:ProductCategory){
    const today = new Date();
    const dateFrom = new Date(today);
    dateFrom.setDate(today.getDate() - 30);
    return this.getProductsByDate(dateFrom, today, category);
  }
}
