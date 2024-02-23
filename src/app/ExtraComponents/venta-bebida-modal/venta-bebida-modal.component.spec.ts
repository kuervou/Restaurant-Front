import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaBebidaModalComponent } from './venta-bebida-modal.component';

describe('VentaBebidaModalComponent', () => {
  let component: VentaBebidaModalComponent;
  let fixture: ComponentFixture<VentaBebidaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaBebidaModalComponent]
    });
    fixture = TestBed.createComponent(VentaBebidaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
