import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCategoriaModalComponent } from './modificar-categoria-modal.component';

describe('ModificarCategoriaModalComponent', () => {
  let component: ModificarCategoriaModalComponent;
  let fixture: ComponentFixture<ModificarCategoriaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarCategoriaModalComponent]
    });
    fixture = TestBed.createComponent(ModificarCategoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
