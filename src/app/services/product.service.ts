import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';
import { ProductStorageService } from './product-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productStorage:ProductStorageService) { }

  createProduct(product:Product){
    this.productStorage.createProduct(product)
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
