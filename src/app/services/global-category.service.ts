import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProductCategory } from "../models/product.model";

@Injectable({
    providedIn: 'root'
  })
  export class GlobalCategoryService {
    private categorySubject = new BehaviorSubject<ProductCategory>(ProductCategory.Notebooks)
    
    category$ = this.categorySubject.asObservable()

    changeCategory(newCategory: ProductCategory): void {
        this.categorySubject.next(newCategory);
    }

  }

  