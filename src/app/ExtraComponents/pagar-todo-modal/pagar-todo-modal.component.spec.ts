import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarTodoModalComponent } from './pagar-todo-modal.component';

describe('PagarTodoModalComponent', () => {
  let component: PagarTodoModalComponent;
  let fixture: ComponentFixture<PagarTodoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagarTodoModalComponent]
    });
    fixture = TestBed.createComponent(PagarTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
