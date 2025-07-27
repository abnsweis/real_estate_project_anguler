import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edite } from './edite';

describe('Edite', () => {
  let component: Edite;
  let fixture: ComponentFixture<Edite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Edite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Edite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
