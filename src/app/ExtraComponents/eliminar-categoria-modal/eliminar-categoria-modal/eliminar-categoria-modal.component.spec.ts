import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCategoriaModalComponent } from './eliminar-categoria-modal.component';

describe('EliminarCategoriaModalComponent', () => {
  let component: EliminarCategoriaModalComponent;
  let fixture: ComponentFixture<EliminarCategoriaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarCategoriaModalComponent]
    });
    fixture = TestBed.createComponent(EliminarCategoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
