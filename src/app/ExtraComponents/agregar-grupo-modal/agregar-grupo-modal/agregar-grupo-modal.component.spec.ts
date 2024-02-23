import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGrupoModalComponent } from './agregar-grupo-modal.component';

describe('AgregarGrupoModalComponent', () => {
  let component: AgregarGrupoModalComponent;
  let fixture: ComponentFixture<AgregarGrupoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarGrupoModalComponent]
    });
    fixture = TestBed.createComponent(AgregarGrupoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
