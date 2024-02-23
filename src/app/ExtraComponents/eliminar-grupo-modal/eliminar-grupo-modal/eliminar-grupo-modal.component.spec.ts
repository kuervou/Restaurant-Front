import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarGrupoModalComponent } from './eliminar-grupo-modal.component';

describe('EliminarGrupoModalComponent', () => {
  let component: EliminarGrupoModalComponent;
  let fixture: ComponentFixture<EliminarGrupoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarGrupoModalComponent]
    });
    fixture = TestBed.createComponent(EliminarGrupoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
