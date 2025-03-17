import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from "../product-form/product-form.component"; 

@Component({
  selector: 'app-crud-modal',
  imports: [ProductFormComponent],
  templateUrl: './crud-modal.component.html',
  standalone:true,
  providers:[DatePipe],
  styleUrl: './crud-modal.component.scss'
})
export class CrudModalComponent {
  readonly dialogRef = inject(MatDialogRef<CrudModalComponent>);
  readonly product = inject<any>(MAT_DIALOG_DATA);


  onNoClick(): void {
    this.dialogRef.close();
  }


  closeEditModal(){
    this.dialogRef.close();
  }

}
