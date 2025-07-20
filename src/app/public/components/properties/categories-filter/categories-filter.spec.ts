import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFilter } from './categories-filter';

describe('CategoriesFilter', () => {
  let component: CategoriesFilter;
  let fixture: ComponentFixture<CategoriesFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
