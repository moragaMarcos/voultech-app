import { Component, inject } from '@angular/core';
import { DataHandlerComponent } from "../data-handler/data-handler.component";
import { Product, ProductState } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalCategoryService } from '../../../services/global-category.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { max } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [DataHandlerComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers:[DatePipe]
})
export class ProductListComponent {
  products:Product[] = []
  auxProducts: Product[] = []; 
  maxPrice: number = 0
  globalFilter:any = {
    state:{ inicial:true, completado:true, pendiente:true },
    date:{start:'',end:''}, 
    maxPrice: 0, 
    order: {
      date: {
        true: () => {
        this.products = [...this.auxProducts.sort(
            (a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
          )]
        },
        false: () => {
          this.products = [...this.auxProducts.sort(
            (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
          )]
        }
      },
      price: {
        true: () => {
        this.products = [...this.auxProducts.sort((a, b) => a.price - b.price)];
        },
        false: () => {
        this.products = [...this.auxProducts.sort((a, b) => b.price - a.price)];
        }
      }
    }}
  originalStates:any = { inicial:true, completado:true, pendiente:true}
  readonly dialog = inject(MatDialog);

  constructor(
    private productService: ProductService, 
    private globalCategoryService:GlobalCategoryService,
    private router:Router,
    private datePipe: DatePipe
  ){}
  ngOnInit(): void {
     this.globalCategoryService.category$.subscribe(category=>{
       this.products = this.productService.getProductsByCategory(category)
       this.maxPrice = Math.max(...this.products.map(product => product.price));
       this.globalFilter.maxPrice = this.maxPrice
       this.auxProducts = this.products
     })
  }
  goToDetail(id:number) {
    this.router.navigate([`/products/${id}`]);
  }
  filterState(event:any){
    this.originalStates[event.type] = event.value
    this.globalFilter['state'][event.type] = event.value
    this.products = this.auxProducts.filter(product => this.originalStates[product.state])
    this.initFilters()

  }
  filterDate(event:any){
    // this.products = this.auxProducts.filter(product=>{
    //   return this.datePipe.transform(product.creationDate,'dd/MM/yyyy')!  >= event.start && this.datePipe.transform(product.creationDate,'dd/MM/yyyy')! <= event.end
    // })
    this.globalFilter['date']['start'] = event.start
    this.globalFilter['date']['end'] = event.end
    this.initFilters()
 
  }
  byOrder(event:any){
    // const obj:any = {
    //   date: {
    //     true: () => {
    //      this.products = [...this.auxProducts.sort(
    //         (a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
    //       )]
    //     },
    //     false: () => {
    //       this.products = [...this.auxProducts.sort(
    //         (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    //       )]
    //     }
    //   },
    //   price: {
    //     true: () => {
    //      this.products = [...this.auxProducts.sort((a, b) => a.price - b.price)];
    //     },
    //     false: () => {
    //      this.products = [...this.auxProducts.sort((a, b) => b.price - a.price)];
    //     }
    //   }
    // };
    this.globalFilter['order'][event.type][event.value]()
    // obj[event.type][event.value]();
    this.initFilters()
    
  }
  filterPrice(event:any){

    this.products = this.auxProducts.filter(product=>product.price <= event)
    this.globalFilter['maxPrice'] = event
    this.initFilters()
    
  }
initFilters(){
  if(this.globalFilter.date.start != '' && this.globalFilter.date.end != '' ){
    this.products = this.auxProducts.filter(product => {
      const productDate = this.datePipe.transform(product.creationDate, 'dd/MM/yyyy')!;
      return (
        productDate >= this.globalFilter.date.start &&
        productDate <= this.globalFilter.date.end &&
        this.globalFilter['state'][product.state] && 
        product.price <= this.globalFilter['maxPrice']
      );
    });
  }
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
