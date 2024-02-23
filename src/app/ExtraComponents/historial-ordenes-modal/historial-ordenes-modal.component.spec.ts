import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOrdenesModalComponent } from './historial-ordenes-modal.component';

describe('HistorialOrdenesModalComponent', () => {
  let component: HistorialOrdenesModalComponent;
  let fixture: ComponentFixture<HistorialOrdenesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialOrdenesModalComponent]
    });
    fixture = TestBed.createComponent(HistorialOrdenesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
