import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeMenuComponent } from './back-office-menu.component';

describe('BackOfficeMenuComponent', () => {
  let component: BackOfficeMenuComponent;
  let fixture: ComponentFixture<BackOfficeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackOfficeMenuComponent]
    });
    fixture = TestBed.createComponent(BackOfficeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
