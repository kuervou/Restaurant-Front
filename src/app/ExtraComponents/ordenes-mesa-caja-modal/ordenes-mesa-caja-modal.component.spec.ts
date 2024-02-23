import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesMesaCajaModalComponent } from './ordenes-mesa-caja-modal.component';

describe('OrdenesMesaCajaModalComponent', () => {
  let component: OrdenesMesaCajaModalComponent;
  let fixture: ComponentFixture<OrdenesMesaCajaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenesMesaCajaModalComponent]
    });
    fixture = TestBed.createComponent(OrdenesMesaCajaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
