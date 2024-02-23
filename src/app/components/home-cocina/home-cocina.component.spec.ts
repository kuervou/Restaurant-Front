import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCocinaComponent } from './home-cocina.component';

describe('HomeCocinaComponent', () => {
  let component: HomeCocinaComponent;
  let fixture: ComponentFixture<HomeCocinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCocinaComponent]
    });
    fixture = TestBed.createComponent(HomeCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
