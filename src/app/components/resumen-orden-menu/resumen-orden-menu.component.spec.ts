import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenOrdenMenuComponent } from './resumen-orden-menu.component';

describe('ResumenOrdenMenuComponent', () => {
  let component: ResumenOrdenMenuComponent;
  let fixture: ComponentFixture<ResumenOrdenMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenOrdenMenuComponent]
    });
    fixture = TestBed.createComponent(ResumenOrdenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
