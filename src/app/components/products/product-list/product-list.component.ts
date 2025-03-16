import { Component } from '@angular/core';
import { DataHandlerComponent } from "../data-handler/data-handler.component";
import { RecentProductsListComponent } from "../../dashboard/recent-products-list/recent-products-list.component";

@Component({
  selector: 'app-product-list',
  imports: [DataHandlerComponent, RecentProductsListComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

}
