import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarParcialModalComponent } from './pagar-parcial-modal.component';

describe('PagarParcialModalComponent', () => {
  let component: PagarParcialModalComponent;
  let fixture: ComponentFixture<PagarParcialModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagarParcialModalComponent]
    });
    fixture = TestBed.createComponent(PagarParcialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
