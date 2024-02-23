import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarOrdenModalComponent } from './pagar-orden-modal.component';

describe('PagarOrdenModalComponent', () => {
  let component: PagarOrdenModalComponent;
  let fixture: ComponentFixture<PagarOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagarOrdenModalComponent]
    });
    fixture = TestBed.createComponent(PagarOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
