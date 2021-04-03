import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyEmiComponent } from './apply-emi.component';

describe('ApplyEmiComponent', () => {
  let component: ApplyEmiComponent;
  let fixture: ComponentFixture<ApplyEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyEmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
