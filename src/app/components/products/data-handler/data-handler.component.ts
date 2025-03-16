import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';



@Component({
  selector: 'app-data-handler',
  imports: [MatDatepickerModule, CommonModule, FormsModule],
  templateUrl: './data-handler.component.html',
  styleUrl: './data-handler.component.scss'
})
export class DataHandlerComponent {
  valorRange:number = 0
  maxPrice: number = 100;
  onChangeRangeBtn(target:any){
    const rangeElement  = target as HTMLInputElement
    console.log(rangeElement.value);
    
  }
}
