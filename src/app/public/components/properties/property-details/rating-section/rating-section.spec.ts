import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSection } from './rating-section';

describe('RatingSection', () => {
  let component: RatingSection;
  let fixture: ComponentFixture<RatingSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
