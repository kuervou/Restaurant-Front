import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasVentasComponent } from './estadisticas-ventas.component';

describe('EstadisticasVentasComponent', () => {
  let component: EstadisticasVentasComponent;
  let fixture: ComponentFixture<EstadisticasVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasVentasComponent]
    });
    fixture = TestBed.createComponent(EstadisticasVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
