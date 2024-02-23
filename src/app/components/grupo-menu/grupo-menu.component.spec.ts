import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoMenuComponent } from './grupo-menu.component';

describe('GrupoMenuComponent', () => {
  let component: GrupoMenuComponent;
  let fixture: ComponentFixture<GrupoMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoMenuComponent]
    });
    fixture = TestBed.createComponent(GrupoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
