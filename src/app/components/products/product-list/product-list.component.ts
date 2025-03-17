import { Component, inject } from '@angular/core';
import { DataHandlerComponent } from "../data-handler/data-handler.component";
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';

@Component({
  selector: 'app-product-list',
  imports: [DataHandlerComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products:Product[] = []
  readonly dialog = inject(MatDialog);

  constructor(private productService: ProductService, private globalCategoryService:GlobalCategoryService,private router:Router){}
  ngOnInit(): void {
     this.globalCategoryService.category$.subscribe(category=>{
       this.products = this.productService.getProductsByCategory(category)
     })
  }
  goToDetail(id:number) {
    this.router.navigate([`/products/${id}`]);
  }

  openDialog(isAdd:boolean): void {
    const dialogRef = this.dialog.open(CrudModalComponent, {
      data: {add:isAdd},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
