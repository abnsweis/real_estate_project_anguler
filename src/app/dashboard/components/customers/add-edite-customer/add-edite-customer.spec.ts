import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditeCustomer } from './add-edite-customer';

describe('AddEditeCustomer', () => {
  let component: AddEditeCustomer;
  let fixture: ComponentFixture<AddEditeCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditeCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditeCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
