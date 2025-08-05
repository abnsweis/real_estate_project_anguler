import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetails } from './property-details';

describe('PropertyDetails', () => {
  let component: PropertyDetails;
  let fixture: ComponentFixture<PropertyDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
