import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarAccionModalComponent } from './confirmar-accion-modal.component';

describe('ConfirmarAccionModalComponent', () => {
  let component: ConfirmarAccionModalComponent;
  let fixture: ComponentFixture<ConfirmarAccionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarAccionModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmarAccionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
