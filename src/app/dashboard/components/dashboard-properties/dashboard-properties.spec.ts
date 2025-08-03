import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProperties } from './dashboard-properties';

describe('DashboardProperties', () => {
  let component: DashboardProperties;
  let fixture: ComponentFixture<DashboardProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProperties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
