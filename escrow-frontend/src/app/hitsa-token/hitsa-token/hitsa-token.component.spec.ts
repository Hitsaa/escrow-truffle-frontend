import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitsaTokenComponent } from './hitsa-token.component';

describe('HitsaTokenComponent', () => {
  let component: HitsaTokenComponent;
  let fixture: ComponentFixture<HitsaTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitsaTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitsaTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
