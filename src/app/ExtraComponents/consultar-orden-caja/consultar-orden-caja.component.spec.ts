import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOrdenCajaComponent } from './consultar-orden-caja.component';

describe('ConsultarOrdenCajaComponent', () => {
  let component: ConsultarOrdenCajaComponent;
  let fixture: ComponentFixture<ConsultarOrdenCajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarOrdenCajaComponent]
    });
    fixture = TestBed.createComponent(ConsultarOrdenCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
