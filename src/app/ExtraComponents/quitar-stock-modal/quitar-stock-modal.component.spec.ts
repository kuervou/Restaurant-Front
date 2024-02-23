import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarStockModalComponent } from './quitar-stock-modal.component';

describe('QuitarStockModalComponent', () => {
  let component: QuitarStockModalComponent;
  let fixture: ComponentFixture<QuitarStockModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuitarStockModalComponent]
    });
    fixture = TestBed.createComponent(QuitarStockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
