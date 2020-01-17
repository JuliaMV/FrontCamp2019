import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCheckboxComponent } from './created-checkbox.component';

describe('CreatedCheckboxComponent', () => {
  let component: CreatedCheckboxComponent;
  let fixture: ComponentFixture<CreatedCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
