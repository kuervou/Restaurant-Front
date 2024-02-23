import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosOrdenCajaModalComponent } from './pagos-orden-caja-modal.component';

describe('PagosOrdenCajaModalComponent', () => {
  let component: PagosOrdenCajaModalComponent;
  let fixture: ComponentFixture<PagosOrdenCajaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosOrdenCajaModalComponent]
    });
    fixture = TestBed.createComponent(PagosOrdenCajaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
