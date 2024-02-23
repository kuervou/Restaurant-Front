import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHomesComponent } from './gestion-homes.component';

describe('GestionHomesComponent', () => {
  let component: GestionHomesComponent;
  let fixture: ComponentFixture<GestionHomesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionHomesComponent]
    });
    fixture = TestBed.createComponent(GestionHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
