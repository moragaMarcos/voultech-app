import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasifyDistributionChartComponent } from './clasify-distribution-chart.component';

describe('ClasifyDistributionChartComponent', () => {
  let component: ClasifyDistributionChartComponent;
  let fixture: ComponentFixture<ClasifyDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasifyDistributionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasifyDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
