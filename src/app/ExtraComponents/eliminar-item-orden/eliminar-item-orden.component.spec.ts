import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarItemOrdenComponent } from './eliminar-item-orden.component';

describe('EliminarItemOrdenComponent', () => {
  let component: EliminarItemOrdenComponent;
  let fixture: ComponentFixture<EliminarItemOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarItemOrdenComponent]
    });
    fixture = TestBed.createComponent(EliminarItemOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
