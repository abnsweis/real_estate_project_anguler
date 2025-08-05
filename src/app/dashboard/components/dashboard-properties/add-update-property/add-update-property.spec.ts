import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProperty } from './add-update-property';

describe('AddUpdateProperty', () => {
  let component: AddUpdateProperty;
  let fixture: ComponentFixture<AddUpdateProperty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateProperty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProperty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
