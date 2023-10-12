import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPickerComponent } from './holiday-picker.component';

describe('HolidayPickerComponent', () => {
  let component: HolidayPickerComponent;
  let fixture: ComponentFixture<HolidayPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
