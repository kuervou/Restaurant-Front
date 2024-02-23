import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOrdenModalComponent } from './modificar-orden-modal.component';

describe('ModificarOrdenModalComponent', () => {
  let component: ModificarOrdenModalComponent;
  let fixture: ComponentFixture<ModificarOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarOrdenModalComponent]
    });
    fixture = TestBed.createComponent(ModificarOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
