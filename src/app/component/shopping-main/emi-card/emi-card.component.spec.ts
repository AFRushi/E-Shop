import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiCardComponent } from './emi-card.component';

describe('EmiCardComponent', () => {
  let component: EmiCardComponent;
  let fixture: ComponentFixture<EmiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
