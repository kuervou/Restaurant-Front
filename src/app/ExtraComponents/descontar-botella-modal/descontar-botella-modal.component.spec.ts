import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescontarBotellaModalComponent } from './descontar-botella-modal.component';

describe('DescontarBotellaModalComponent', () => {
  let component: DescontarBotellaModalComponent;
  let fixture: ComponentFixture<DescontarBotellaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescontarBotellaModalComponent]
    });
    fixture = TestBed.createComponent(DescontarBotellaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
