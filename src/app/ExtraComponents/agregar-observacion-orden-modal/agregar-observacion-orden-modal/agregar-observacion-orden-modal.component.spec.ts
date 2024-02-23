import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarObservacionOrdenModalComponent } from './agregar-observacion-orden-modal.component';

describe('AgregarObservacionOrdenModalComponent', () => {
  let component: AgregarObservacionOrdenModalComponent;
  let fixture: ComponentFixture<AgregarObservacionOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarObservacionOrdenModalComponent]
    });
    fixture = TestBed.createComponent(AgregarObservacionOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
