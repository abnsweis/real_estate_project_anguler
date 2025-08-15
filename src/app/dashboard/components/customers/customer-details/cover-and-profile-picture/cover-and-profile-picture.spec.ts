import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverAndProfilePicture } from './cover-and-profile-picture';

describe('CoverAndProfilePicture', () => {
  let component: CoverAndProfilePicture;
  let fixture: ComponentFixture<CoverAndProfilePicture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoverAndProfilePicture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverAndProfilePicture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
