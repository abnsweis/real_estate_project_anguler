import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProperty } from './update-property';

describe('UpdateProperty', () => {
  let component: UpdateProperty;
  let fixture: ComponentFixture<UpdateProperty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProperty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProperty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
