import { Component, inject, Input, model, signal } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() product!:Product
  readonly dialog = inject(MatDialog);

  openDialog(isAdd:boolean): void {
    const dialogRef = this.dialog.open(CrudModalComponent, {
      data: {data: this.product, add:isAdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {data: this.product}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
