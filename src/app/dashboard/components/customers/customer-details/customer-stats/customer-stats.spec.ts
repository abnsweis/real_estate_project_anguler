import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStats } from './customer-stats';

describe('CustomerStats', () => {
  let component: CustomerStats;
  let fixture: ComponentFixture<CustomerStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
