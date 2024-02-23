import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleadoModalComponent } from './editar-empleado-modal.component';

describe('EditarEmpleadoModalComponent', () => {
  let component: EditarEmpleadoModalComponent;
  let fixture: ComponentFixture<EditarEmpleadoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarEmpleadoModalComponent]
    });
    fixture = TestBed.createComponent(EditarEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
