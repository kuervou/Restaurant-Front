import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMesaModalComponent } from './agregar-mesa-modal.component';

describe('AgregarMesaModalComponent', () => {
  let component: AgregarMesaModalComponent;
  let fixture: ComponentFixture<AgregarMesaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarMesaModalComponent]
    });
    fixture = TestBed.createComponent(AgregarMesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
