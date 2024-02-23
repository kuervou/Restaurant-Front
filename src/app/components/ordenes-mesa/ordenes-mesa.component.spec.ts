import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesMesaComponent } from './ordenes-mesa.component';

describe('OrdenesMesaComponent', () => {
  let component: OrdenesMesaComponent;
  let fixture: ComponentFixture<OrdenesMesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenesMesaComponent]
    });
    fixture = TestBed.createComponent(OrdenesMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
