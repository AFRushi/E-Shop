import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEmiHereComponent } from './pay-emi-here.component';

describe('PayEmiHereComponent', () => {
  let component: PayEmiHereComponent;
  let fixture: ComponentFixture<PayEmiHereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayEmiHereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayEmiHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});