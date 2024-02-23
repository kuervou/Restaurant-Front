import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModficarItemMenuModalComponent } from './modficar-item-menu-modal.component';

describe('ModficarItemMenuModalComponent', () => {
  let component: ModficarItemMenuModalComponent;
  let fixture: ComponentFixture<ModficarItemMenuModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModficarItemMenuModalComponent]
    });
    fixture = TestBed.createComponent(ModficarItemMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
