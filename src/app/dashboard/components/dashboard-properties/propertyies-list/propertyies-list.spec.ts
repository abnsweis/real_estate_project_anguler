import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyiesList } from './propertyies-list';

describe('PropertyiesList', () => {
  let component: PropertyiesList;
  let fixture: ComponentFixture<PropertyiesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyiesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyiesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
