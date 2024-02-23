import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarItemModalComponent } from './modificar-item-modal.component';

describe('ModificarItemModalComponent', () => {
  let component: ModificarItemModalComponent;
  let fixture: ComponentFixture<ModificarItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarItemModalComponent]
    });
    fixture = TestBed.createComponent(ModificarItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
