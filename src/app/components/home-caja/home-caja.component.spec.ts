import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCajaComponent } from './home-caja.component';

describe('HomeCajaComponent', () => {
  let component: HomeCajaComponent;
  let fixture: ComponentFixture<HomeCajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCajaComponent]
    });
    fixture = TestBed.createComponent(HomeCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
