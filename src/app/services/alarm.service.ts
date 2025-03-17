import { Injectable } from '@angular/core';
import { AlarmStorageService } from './alarm-storage.service';
import { Alarm } from '../models/alarm.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private alarmStorageService:AlarmStorageService) { }

  getAlarms():Alarm[]{
   return  this.alarmStorageService.getAlarms()
  }
  updateAlarm(alarmId:number, updatedData:Partial<Alarm>):void{
    this.alarmStorageService.updateAlarm(alarmId, updatedData)
  }
}
