import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstadisticasComponent } from './home-estadisticas.component';

describe('HomeEstadisticasComponent', () => {
  let component: HomeEstadisticasComponent;
  let fixture: ComponentFixture<HomeEstadisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEstadisticasComponent]
    });
    fixture = TestBed.createComponent(HomeEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
