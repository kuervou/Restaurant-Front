import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosCajaModalComponent } from './movimientos-caja-modal.component';

describe('MovimientosCajaModalComponent', () => {
  let component: MovimientosCajaModalComponent;
  let fixture: ComponentFixture<MovimientosCajaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientosCajaModalComponent]
    });
    fixture = TestBed.createComponent(MovimientosCajaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
