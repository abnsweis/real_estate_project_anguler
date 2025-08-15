import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeCustomer } from './edite-customer';

describe('EditeCustomer', () => {
  let component: EditeCustomer;
  let fixture: ComponentFixture<EditeCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditeCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
