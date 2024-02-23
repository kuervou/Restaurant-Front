import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarItemMenuModalComponent } from './consultar-item-menu-modal.component';

describe('ConsultarItemMenuModalComponent', () => {
  let component: ConsultarItemMenuModalComponent;
  let fixture: ComponentFixture<ConsultarItemMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarItemMenuModalComponent]
    });
    fixture = TestBed.createComponent(ConsultarItemMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
