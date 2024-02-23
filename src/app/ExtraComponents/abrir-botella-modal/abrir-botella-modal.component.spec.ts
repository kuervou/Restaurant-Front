import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirBotellaModalComponent } from './abrir-botella-modal.component';

describe('AbrirBotellaModalComponent', () => {
  let component: AbrirBotellaModalComponent;
  let fixture: ComponentFixture<AbrirBotellaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirBotellaModalComponent]
    });
    fixture = TestBed.createComponent(AbrirBotellaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
