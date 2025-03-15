import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductCategory } from './models/product.model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalCategoryService } from './services/global-category.service';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

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
export class AppComponent {
  title = 'Dashboard'
  categories = Object.values(ProductCategory);
  private subscription!: Subscription;
  isCollapsed = false;

  notifications: Notification[] = [
    { id: 1, title: 'Nueva tarea asignada', message: 'Tarea #123' },
    { id: 2, title: 'Mensaje de soporte', message: 'Revisa el mensaje #456' },
  ];
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Products', icon: 'inventory', route: '/products' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
  constructor(private globalCategoryService: GlobalCategoryService) {}

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
