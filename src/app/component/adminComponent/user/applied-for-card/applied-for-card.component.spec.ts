import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedForCardComponent } from './applied-for-card.component';

describe('AppliedForCardComponent', () => {
  let component: AppliedForCardComponent;
  let fixture: ComponentFixture<AppliedForCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedForCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedForCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
