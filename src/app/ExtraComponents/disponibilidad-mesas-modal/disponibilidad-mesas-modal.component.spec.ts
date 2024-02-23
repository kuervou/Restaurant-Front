import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadMesasModalComponent } from './disponibilidad-mesas-modal.component';

describe('DisponibilidadMesasModalComponent', () => {
  let component: DisponibilidadMesasModalComponent;
  let fixture: ComponentFixture<DisponibilidadMesasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibilidadMesasModalComponent]
    });
    fixture = TestBed.createComponent(DisponibilidadMesasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
