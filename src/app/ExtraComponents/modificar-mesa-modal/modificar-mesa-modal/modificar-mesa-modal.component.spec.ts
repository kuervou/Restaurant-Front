import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMesaModalComponent } from './modificar-mesa-modal.component';

describe('ModificarMesaModalComponent', () => {
  let component: ModificarMesaModalComponent;
  let fixture: ComponentFixture<ModificarMesaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarMesaModalComponent]
    });
    fixture = TestBed.createComponent(ModificarMesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
