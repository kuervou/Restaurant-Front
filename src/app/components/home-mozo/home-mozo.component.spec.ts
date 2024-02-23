import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMozoComponent } from './home-mozo.component';

describe('HomeMozoComponent', () => {
  let component: HomeMozoComponent;
  let fixture: ComponentFixture<HomeMozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMozoComponent]
    });
    fixture = TestBed.createComponent(HomeMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
