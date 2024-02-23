import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosCajaModalComponent } from './pagos-caja-modal.component';

describe('PagosCajaModalComponent', () => {
  let component: PagosCajaModalComponent;
  let fixture: ComponentFixture<PagosCajaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosCajaModalComponent]
    });
    fixture = TestBed.createComponent(PagosCajaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
