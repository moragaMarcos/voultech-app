import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStorageService {
  private storageKey = 'products';
  private idCounterKey = 'productIdSimulated';

  constructor() { }

  getProducts(): Product[] {
    const productsData = localStorage.getItem(this.storageKey);
    if (!productsData) return [];
    const products = JSON.parse(productsData) as Product[];
    return products.map(product => ({
      ...product,
      date: new Date(product.creationDate)
    }));
  }

  private generateId(): number {
    let currentId = Number(localStorage.getItem(this.idCounterKey)) || 1;
    currentId++;
    localStorage.setItem(this.idCounterKey, currentId.toString());
    return currentId;
  }

  createProduct(product: Product): void {
    product.id = this.generateId();
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  updateProduct(productId: number, updatedData: Partial<Product>): void {
    const products = this.getProducts();
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, ...updatedData };
      }
      return product;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
  }

  deleteProduct(productId: number): void {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => product.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredProducts));
  }
}
