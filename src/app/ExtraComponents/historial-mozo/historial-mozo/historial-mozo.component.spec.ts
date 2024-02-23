import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMozoComponent } from './historial-mozo.component';

describe('HistorialMozoComponent', () => {
  let component: HistorialMozoComponent;
  let fixture: ComponentFixture<HistorialMozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialMozoComponent]
    });
    fixture = TestBed.createComponent(HistorialMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
