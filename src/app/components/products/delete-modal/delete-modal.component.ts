import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteModalComponent>);
  readonly product = inject<any>(MAT_DIALOG_DATA);

  constructor(private productService:ProductService, private router:Router){}
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product.data.id)
    this.dialogRef.close();
    this.router.navigate([`/products`]);
  }
  closeDeleteModal(){
    this.dialogRef.close();
  }

}
