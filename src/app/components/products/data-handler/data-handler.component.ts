import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';



@Component({
  selector: 'app-data-handler',
  imports: [MatDatepickerModule, CommonModule, FormsModule],
  templateUrl: './data-handler.component.html',
  styleUrl: './data-handler.component.scss',
  providers: [DatePipe]
})
export class DataHandlerComponent implements OnInit {
  
  @Output() stateFilter:EventEmitter<any> = new EventEmitter
  @Output() dateFilter:EventEmitter<any> = new EventEmitter
  @Output() priceFilter:EventEmitter<any> = new EventEmitter
  @Output() orderBy:EventEmitter<any> = new EventEmitter

  @Input() maxPrice: number = 0;
  @Input() minPrice: number = 0;


  orderByPriceAsc:boolean = true
  orderByDateAsc:boolean = true
  maxPriceSlider:number = 0
  isCompleted:boolean = true
  isInitial:boolean = true
  isPending:boolean = true
  dateObj = {start: '', end:''}


  constructor(private datePipe: DatePipe){}

  ngOnInit(){ this.maxPriceSlider = this.maxPrice}

  onSelectedStatus(event:Event):void{
    const checkbox = event.target as HTMLInputElement;
    const filterObj = {
      type: checkbox.name,
      value: checkbox.checked
    }
    this.stateFilter.emit(filterObj)
  }
  onSelectedDate(type:string, event: MatDatepickerInputEvent<Date>):void{
    const transFormDate = this.datePipe.transform(event.value, 'dd/MM/yyyy')
    if(transFormDate){
     if (type === 'start') {
       this.dateObj['start'] = transFormDate
     } else if (type === 'end') {
       this.dateObj['end'] = transFormDate;
     }
     if(this.dateObj['start'] != '' && this.dateObj['end'] != '') {
       this.dateFilter.emit(this.dateObj)
       this.dateObj = {start: '', end:''}
     }
   }
  }
  onOrderBy(event:Event){
    const checkbox  = event.target as HTMLInputElement
    const filterObj = {
      type: checkbox.name,
      value: checkbox.checked
    }
    this.orderBy.emit(filterObj)
  }
  onChangeRangeBtn(target:any):void{
    const rangeElement  = target as HTMLInputElement
    
    this.maxPriceSlider = Number(rangeElement.value)
    this.priceFilter.emit(rangeElement.value)
  }
}
