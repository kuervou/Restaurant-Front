import { TestBed } from '@angular/core/testing';

import { MenubackofficeService } from './menubackoffice.service';

describe('MenubackofficeService', () => {
  let service: MenubackofficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenubackofficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
