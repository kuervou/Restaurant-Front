import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasBarraComponent } from './estadisticas-barra.component';

describe('EstadisticasBarraComponent', () => {
  let component: EstadisticasBarraComponent;
  let fixture: ComponentFixture<EstadisticasBarraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasBarraComponent]
    });
    fixture = TestBed.createComponent(EstadisticasBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
