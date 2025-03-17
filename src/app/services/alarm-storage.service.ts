import { Injectable } from '@angular/core';
import { Alarm, AlarmCondition } from '../models/alarm.model';
import { ProductCategory, ProductState } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmStorageService {
  private storageKey = 'alarms';

  constructor() { }

  getAlarms(): Alarm[] {
    const productsData = localStorage.getItem(this.storageKey);
    if (!productsData) return [];
    const products = JSON.parse(productsData) as Alarm[];
    return products
  }
  updateAlarm(alarmId: number, updatedData: Partial<Alarm>): void {
    const alarms = this.getAlarms();
    const updatedProduct = alarms.map(alarm => {
      if (alarm.id === alarmId) {
        return { ...alarm, ...updatedData };
      }
      return alarm;
    });
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProduct));
  }
  initAlarms(): void {
    if (!localStorage.getItem(this.storageKey)) {
      const initialAlarms: Alarm[] = [
        {
          id: 1,
          name: "Alarma Notebooks",
          category: "Notebooks" as ProductCategory, 
          criterion: "inicial" as ProductState,        
          condition: AlarmCondition.MayorQue,
          value: 2,
          isEditing:false,
          active: false
        },
        {
          id: 2,
          name: "Alarma Celulares",
          category: "Celulares" as ProductCategory,
          criterion: "completado" as ProductState,
          condition: AlarmCondition.MenorQue,
          value: 4,
          isEditing:false,
          active: false
        },
        {
          id: 3,
          name: "Alarma Consolas",
          category: "Consolas" as ProductCategory,
          criterion: "pendiente" as ProductState,
          condition: AlarmCondition.MenorOIgualQue,
          value: 5,
          isEditing:false,
          active: false
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(initialAlarms));
    }
  }
  
}
