import { Component } from '@angular/core';
import { KpiCardComponent } from "../../components/dashboard/kpi-card/kpi-card.component";

@Component({
  selector: 'app-dashboard',
  imports: [KpiCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
