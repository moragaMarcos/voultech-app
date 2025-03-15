import { Component } from '@angular/core';
import { KpiCardComponent } from "../../components/dashboard/kpi-card/kpi-card.component";
import { DistributionChartComponent } from "../../components/dashboard/distribution-chart/distribution-chart.component";

@Component({
  selector: 'app-dashboard',
  imports: [KpiCardComponent, DistributionChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
