import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarItemMenuModalComponent } from './activar-item-menu-modal.component';

describe('ActivarItemMenuModalComponent', () => {
  let component: ActivarItemMenuModalComponent;
  let fixture: ComponentFixture<ActivarItemMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivarItemMenuModalComponent]
    });
    fixture = TestBed.createComponent(ActivarItemMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
