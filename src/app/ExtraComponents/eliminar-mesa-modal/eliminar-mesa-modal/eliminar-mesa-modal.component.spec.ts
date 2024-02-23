import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMesaModalComponent } from './eliminar-mesa-modal.component';

describe('EliminarMesaModalComponent', () => {
  let component: EliminarMesaModalComponent;
  let fixture: ComponentFixture<EliminarMesaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarMesaModalComponent]
    });
    fixture = TestBed.createComponent(EliminarMesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
