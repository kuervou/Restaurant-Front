import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberarMesaModalComponent } from './liberar-mesa-modal.component';

describe('LiberarMesaModalComponent', () => {
  let component: LiberarMesaModalComponent;
  let fixture: ComponentFixture<LiberarMesaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiberarMesaModalComponent]
    });
    fixture = TestBed.createComponent(LiberarMesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
