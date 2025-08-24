import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCards } from './sale-cards';

describe('SaleCards', () => {
  let component: SaleCards;
  let fixture: ComponentFixture<SaleCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
