import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEmpleadoModalComponent } from './eliminar-empleado-modal.component';

describe('EliminarEmpleadoModalComponent', () => {
  let component: EliminarEmpleadoModalComponent;
  let fixture: ComponentFixture<EliminarEmpleadoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarEmpleadoModalComponent]
    });
    fixture = TestBed.createComponent(EliminarEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
