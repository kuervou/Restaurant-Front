import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarOrdenMenuComponent } from './confirmar-orden-menu.component';

describe('ConfirmarOrdenMenuComponent', () => {
  let component: ConfirmarOrdenMenuComponent;
  let fixture: ComponentFixture<ConfirmarOrdenMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarOrdenMenuComponent]
    });
    fixture = TestBed.createComponent(ConfirmarOrdenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
