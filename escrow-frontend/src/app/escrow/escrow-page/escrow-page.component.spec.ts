import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscrowPageComponent } from './escrow-page.component';

describe('EscrowPageComponent', () => {
  let component: EscrowPageComponent;
  let fixture: ComponentFixture<EscrowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscrowPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscrowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
