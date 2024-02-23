import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOrdenModalComponent } from './agregar-orden-modal.component';

describe('AgregarOrdenModalComponent', () => {
  let component: AgregarOrdenModalComponent;
  let fixture: ComponentFixture<AgregarOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarOrdenModalComponent]
    });
    fixture = TestBed.createComponent(AgregarOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
