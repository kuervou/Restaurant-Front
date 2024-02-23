import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesBotellasModalComponent } from './acciones-botellas-modal.component';

describe('AccionesBotellasModalComponent', () => {
  let component: AccionesBotellasModalComponent;
  let fixture: ComponentFixture<AccionesBotellasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionesBotellasModalComponent]
    });
    fixture = TestBed.createComponent(AccionesBotellasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
