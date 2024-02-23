import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarOrdenMenuMozoComponent } from './confirmar-orden-menu-mozo.component';

describe('ConfirmarOrdenMenuMozoComponent', () => {
  let component: ConfirmarOrdenMenuMozoComponent;
  let fixture: ComponentFixture<ConfirmarOrdenMenuMozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarOrdenMenuMozoComponent]
    });
    fixture = TestBed.createComponent(ConfirmarOrdenMenuMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
