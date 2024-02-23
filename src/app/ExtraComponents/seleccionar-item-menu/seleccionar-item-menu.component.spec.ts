import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarItemMenuComponent } from './seleccionar-item-menu.component';

describe('SeleccionarItemMenuComponent', () => {
  let component: SeleccionarItemMenuComponent;
  let fixture: ComponentFixture<SeleccionarItemMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarItemMenuComponent]
    });
    fixture = TestBed.createComponent(SeleccionarItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
