import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filtering } from './filtering';

describe('Filtering', () => {
  let component: Filtering;
  let fixture: ComponentFixture<Filtering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Filtering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Filtering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
