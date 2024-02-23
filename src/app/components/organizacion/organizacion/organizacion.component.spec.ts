import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionComponent } from './organizacion.component';

describe('OrganizacionComponent', () => {
  let component: OrganizacionComponent;
  let fixture: ComponentFixture<OrganizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizacionComponent]
    });
    fixture = TestBed.createComponent(OrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
