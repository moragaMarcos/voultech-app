import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentProductsListComponent } from './recent-products-list.component';

describe('RecentProductsListComponent', () => {
  let component: RecentProductsListComponent;
  let fixture: ComponentFixture<RecentProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentProductsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
