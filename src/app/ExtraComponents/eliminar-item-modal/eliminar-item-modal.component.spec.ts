import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarItemModalComponent } from './eliminar-item-modal.component';

describe('EliminarItemModalComponent', () => {
  let component: EliminarItemModalComponent;
  let fixture: ComponentFixture<EliminarItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarItemModalComponent]
    });
    fixture = TestBed.createComponent(EliminarItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
