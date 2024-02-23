import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarModificarOrdenComponent } from './confirmar-modificar-orden.component';

describe('ConfirmarModificarOrdenComponent', () => {
  let component: ConfirmarModificarOrdenComponent;
  let fixture: ComponentFixture<ConfirmarModificarOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarModificarOrdenComponent]
    });
    fixture = TestBed.createComponent(ConfirmarModificarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
