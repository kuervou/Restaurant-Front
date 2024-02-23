import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCajaComponent } from './footer-caja.component';

describe('FooterCajaComponent', () => {
  let component: FooterCajaComponent;
  let fixture: ComponentFixture<FooterCajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterCajaComponent]
    });
    fixture = TestBed.createComponent(FooterCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
