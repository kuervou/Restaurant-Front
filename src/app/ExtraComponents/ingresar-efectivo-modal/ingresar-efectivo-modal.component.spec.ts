import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEfectivoModalComponent } from './ingresar-efectivo-modal.component';

describe('IngresarEfectivoModalComponent', () => {
  let component: IngresarEfectivoModalComponent;
  let fixture: ComponentFixture<IngresarEfectivoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarEfectivoModalComponent]
    });
    fixture = TestBed.createComponent(IngresarEfectivoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
