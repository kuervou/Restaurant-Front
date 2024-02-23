import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrdenModalComponent } from './editar-orden-modal.component';

describe('EditarOrdenModalComponent', () => {
  let component: EditarOrdenModalComponent;
  let fixture: ComponentFixture<EditarOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarOrdenModalComponent]
    });
    fixture = TestBed.createComponent(EditarOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
