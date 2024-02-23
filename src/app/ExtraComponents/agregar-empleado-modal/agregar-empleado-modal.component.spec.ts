import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmpleadoModalComponent } from './agregar-empleado-modal.component';

describe('AgregarEmpleadoModalComponent', () => {
  let component: AgregarEmpleadoModalComponent;
  let fixture: ComponentFixture<AgregarEmpleadoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEmpleadoModalComponent]
    });
    fixture = TestBed.createComponent(AgregarEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
