import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTable } from './table';

describe('Table', () => {
  let component: CategoriesTable;
  let fixture: ComponentFixture<CategoriesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesTable]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
