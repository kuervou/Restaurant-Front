import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoOrdenMenuComponent } from './exito-orden-menu.component';

describe('ExitoOrdenMenuComponent', () => {
  let component: ExitoOrdenMenuComponent;
  let fixture: ComponentFixture<ExitoOrdenMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitoOrdenMenuComponent]
    });
    fixture = TestBed.createComponent(ExitoOrdenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
