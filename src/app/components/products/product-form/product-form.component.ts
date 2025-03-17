import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
  @Input() product!: Product
  @Input() dialogRef!:MatDialogRef<any, any>
  @Input() isAdd!:boolean
  
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private productService:ProductService){
    this.productForm = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      creationDate: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      state: new FormControl(),
      urlImg: new FormControl()
  });
  }

  ngOnInit(): void {
    if(this.isAdd){
      this.productForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        category: [this.product.category, Validators.required],
        price: [this.product.price, [Validators.required, Validators.min(0)]],
        description: [this.product.description],
        urlImg: [this.product.urlImg],
        state : [this.product.state]
      });
    }
  }
  
  onSubmit() {
    if (this.productForm.valid) {
      if(this.isAdd){
        this.productService.updateProduct(this.product.id, this.productForm.value)
      }else{
        this.productService.createProduct({...this.productForm.value,creationDate: this.datePipe.transform(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")})
      }
    }
    this.dialogRef.close();
  }

  closeEditModal(){
    this.dialogRef.close();
  }

}
