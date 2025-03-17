import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe){
    this.productForm = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      creationDate: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      state: new FormControl()
  });
  }

  ngOnInit(): void {
    if(this.isAdd){
      const formattedDate = this.datePipe.transform(this.product.creationDate, 'yyyy-MM-dd');
  
      this.productForm = this.formBuilder.group({
        name: [this.product.name, Validators.required],
        category: [this.product.category, Validators.required],
        creationDate: [formattedDate, Validators.required],
        price: [this.product.price, [Validators.required, Validators.min(0)]],
        description: [this.product.description]
      });
    }
  }
  
  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
    this.dialogRef.close();
  }

  closeEditModal(){
    this.dialogRef.close();
  }

}
