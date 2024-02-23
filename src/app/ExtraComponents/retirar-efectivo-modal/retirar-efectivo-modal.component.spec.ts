import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarEfectivoModalComponent } from './retirar-efectivo-modal.component';

describe('RetirarEfectivoModalComponent', () => {
  let component: RetirarEfectivoModalComponent;
  let fixture: ComponentFixture<RetirarEfectivoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetirarEfectivoModalComponent]
    });
    fixture = TestBed.createComponent(RetirarEfectivoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
