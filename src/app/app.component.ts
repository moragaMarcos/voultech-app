import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductCategory } from './models/product.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalCategoryService } from './services/global-category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AlarmStorageService } from './services/alarm-storage.service';
import { AlarmService } from './services/alarm.service';
import { Alarm } from './models/alarm.model';

interface Notification {
  id: number;
  title: string;
  message: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatMenuModule, CommonModule, FormsModule, RouterLink, MatSelectModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Dashboard'
  categories = Object.values(ProductCategory);
  private subscription!: Subscription;
  isCollapsed = false;
  activeAlarms: Alarm[] = [];


  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Products', icon: 'inventory', route: '/products' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
  constructor(
    private globalCategoryService: GlobalCategoryService, 
    private alarmStorageService:AlarmStorageService,
    private alarmService:AlarmService
  ) {}
  
  ngOnInit(){
    this.alarmStorageService.initAlarms()
    this.globalCategoryService.category$.subscribe(category=>{
      this.activeAlarms = this.alarmService.getActiveAlarmsByCategory(category)
    })
  }
  
  onCategoryChange(target: any): void {
    const selector = target as HTMLSelectElement
    const category = selector.value as ProductCategory
    
    this.globalCategoryService.changeCategory(category);
  }
  setTitle(title:string){
    this.title = title
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
