import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringSection } from './filtering-section';

describe('FilteringSection', () => {
  let component: FilteringSection;
  let fixture: ComponentFixture<FilteringSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteringSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteringSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
