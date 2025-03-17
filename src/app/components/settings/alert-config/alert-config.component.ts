import { Component, OnInit } from '@angular/core';
import { Alarm } from '../../../models/alarm.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlarmService } from '../../../services/alarm.service';

@Component({
  selector: 'app-alert-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-config.component.html',
  styleUrl: './alert-config.component.scss'
})
export class AlertConfigComponent implements OnInit {
 alarms:Alarm[] = [] 
 isEditing:boolean = false
 constructor(private alarmService:AlarmService){}
 ngOnInit(): void {
   this.alarms = this.alarmService.getAlarms()
 }
  toggleEdit(alarm: Alarm): void {
    alarm.isEditing = !alarm.isEditing;
    const alarmBody = this.alarmService.getAlarms().find(alarmResponse=>alarmResponse.id === alarm.id)

    if(alarm.isEditing && alarmBody != alarm ){

      this.alarmService.updateAlarm(alarm.id,alarm);
    }
  }
  
}
