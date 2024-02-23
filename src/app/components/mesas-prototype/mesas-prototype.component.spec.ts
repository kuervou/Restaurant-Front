import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasPrototypeComponent } from './mesas-prototype.component';

describe('MesasPrototypeComponent', () => {
  let component: MesasPrototypeComponent;
  let fixture: ComponentFixture<MesasPrototypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesasPrototypeComponent]
    });
    fixture = TestBed.createComponent(MesasPrototypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
