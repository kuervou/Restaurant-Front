import { TestBed } from '@angular/core/testing';

import { MenuMozoService } from './menu-mozo.service';

describe('MenuMozoService', () => {
  let service: MenuMozoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuMozoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
