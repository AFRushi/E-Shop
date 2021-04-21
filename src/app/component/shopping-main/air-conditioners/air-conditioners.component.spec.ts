import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirConditionersComponent } from './air-conditioners.component';

describe('AirConditionersComponent', () => {
  let component: AirConditionersComponent;
  let fixture: ComponentFixture<AirConditionersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirConditionersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirConditionersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
