import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarStockModalComponent } from './agregar-stock-modal.component';

describe('AgregarStockModalComponent', () => {
  let component: AgregarStockModalComponent;
  let fixture: ComponentFixture<AgregarStockModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarStockModalComponent]
    });
    fixture = TestBed.createComponent(AgregarStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
