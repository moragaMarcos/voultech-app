import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDistributionChartComponent } from './state-distribution-chart.component';

describe('StateDistributionChartComponent', () => {
  let component: StateDistributionChartComponent;
  let fixture: ComponentFixture<StateDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateDistributionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
