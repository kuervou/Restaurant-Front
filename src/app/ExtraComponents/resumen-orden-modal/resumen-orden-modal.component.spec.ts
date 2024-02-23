import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenOrdenModalComponent } from './resumen-orden-modal.component';

describe('ResumenOrdenModalComponent', () => {
  let component: ResumenOrdenModalComponent;
  let fixture: ComponentFixture<ResumenOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenOrdenModalComponent]
    });
    fixture = TestBed.createComponent(ResumenOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
