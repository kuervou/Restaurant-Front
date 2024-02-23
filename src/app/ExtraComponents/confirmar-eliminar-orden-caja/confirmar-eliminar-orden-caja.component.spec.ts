import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminarOrdenCajaComponent } from './confirmar-eliminar-orden-caja.component';

describe('ConfirmarEliminarOrdenCajaComponent', () => {
  let component: ConfirmarEliminarOrdenCajaComponent;
  let fixture: ComponentFixture<ConfirmarEliminarOrdenCajaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarEliminarOrdenCajaComponent]
    });
    fixture = TestBed.createComponent(ConfirmarEliminarOrdenCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
