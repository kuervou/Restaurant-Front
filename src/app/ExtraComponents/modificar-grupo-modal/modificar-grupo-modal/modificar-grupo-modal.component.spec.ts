import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarGrupoModalComponent } from './modificar-grupo-modal.component';

describe('ModificarGrupoModalComponent', () => {
  let component: ModificarGrupoModalComponent;
  let fixture: ComponentFixture<ModificarGrupoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarGrupoModalComponent]
    });
    fixture = TestBed.createComponent(ModificarGrupoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
