import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClienteModalComponent } from './agregar-cliente-modal.component';

describe('AgregarClienteModalComponent', () => {
  let component: AgregarClienteModalComponent;
  let fixture: ComponentFixture<AgregarClienteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarClienteModalComponent]
    });
    fixture = TestBed.createComponent(AgregarClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
