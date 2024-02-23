import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarItemModalComponent } from './agregar-item-modal.component';

describe('AgregarItemModalComponent', () => {
  let component: AgregarItemModalComponent;
  let fixture: ComponentFixture<AgregarItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarItemModalComponent]
    });
    fixture = TestBed.createComponent(AgregarItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
