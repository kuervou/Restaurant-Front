import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMozoComponent } from './menu-mozo.component';

describe('MenuMozoComponent', () => {
  let component: MenuMozoComponent;
  let fixture: ComponentFixture<MenuMozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMozoComponent]
    });
    fixture = TestBed.createComponent(MenuMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
