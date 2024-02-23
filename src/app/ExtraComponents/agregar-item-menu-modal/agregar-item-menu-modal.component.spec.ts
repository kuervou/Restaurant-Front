import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarItemMenuModalComponent } from './agregar-item-menu-modal.component';

describe('AgregarItemMenuModalComponent', () => {
  let component: AgregarItemMenuModalComponent;
  let fixture: ComponentFixture<AgregarItemMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarItemMenuModalComponent]
    });
    fixture = TestBed.createComponent(AgregarItemMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
