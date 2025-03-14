import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfigComponent } from './alert-config.component';

describe('AlertConfigComponent', () => {
  let component: AlertConfigComponent;
  let fixture: ComponentFixture<AlertConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
