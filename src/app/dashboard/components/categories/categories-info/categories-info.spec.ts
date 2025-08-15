import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesInfo } from './categories-info';

describe('CategoriesInfo', () => {
  let component: CategoriesInfo;
  let fixture: ComponentFixture<CategoriesInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
