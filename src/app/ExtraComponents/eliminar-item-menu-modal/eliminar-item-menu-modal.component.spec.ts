import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarItemMenuModalComponent } from './eliminar-item-menu-modal.component';

describe('EliminarItemMenuModalComponent', () => {
  let component: EliminarItemMenuModalComponent;
  let fixture: ComponentFixture<EliminarItemMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarItemMenuModalComponent]
    });
    fixture = TestBed.createComponent(EliminarItemMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
