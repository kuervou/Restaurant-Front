import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOrdenMozoComponent } from './consultar-orden-mozo.component';

describe('ConsultarOrdenMozoComponent', () => {
  let component: ConsultarOrdenMozoComponent;
  let fixture: ComponentFixture<ConsultarOrdenMozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarOrdenMozoComponent]
    });
    fixture = TestBed.createComponent(ConsultarOrdenMozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
