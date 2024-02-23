import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClienteModalComponent } from './editar-cliente-modal.component';

describe('EditarClienteModalComponent', () => {
  let component: EditarClienteModalComponent;
  let fixture: ComponentFixture<EditarClienteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarClienteModalComponent]
    });
    fixture = TestBed.createComponent(EditarClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
