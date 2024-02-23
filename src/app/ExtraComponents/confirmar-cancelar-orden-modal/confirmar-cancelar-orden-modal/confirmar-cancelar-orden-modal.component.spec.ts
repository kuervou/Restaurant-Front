import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCancelarOrdenModalComponent } from './confirmar-cancelar-orden-modal.component';

describe('ConfirmarCancelarOrdenModalComponent', () => {
  let component: ConfirmarCancelarOrdenModalComponent;
  let fixture: ComponentFixture<ConfirmarCancelarOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarCancelarOrdenModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmarCancelarOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
