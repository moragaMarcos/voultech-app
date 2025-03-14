import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentProductsCardComponent } from './recent-products-card.component';

describe('RecentProductsCardComponent', () => {
  let component: RecentProductsCardComponent;
  let fixture: ComponentFixture<RecentProductsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentProductsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentProductsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
