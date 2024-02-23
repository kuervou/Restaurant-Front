import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOrdenModalComponent } from './info-orden-modal.component';

describe('InfoOrdenModalComponent', () => {
  let component: InfoOrdenModalComponent;
  let fixture: ComponentFixture<InfoOrdenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoOrdenModalComponent]
    });
    fixture = TestBed.createComponent(InfoOrdenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
