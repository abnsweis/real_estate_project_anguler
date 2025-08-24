import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCustomerInfo } from './short-customer-info';

describe('ShortCustomerInfo', () => {
  let component: ShortCustomerInfo;
  let fixture: ComponentFixture<ShortCustomerInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortCustomerInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortCustomerInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
