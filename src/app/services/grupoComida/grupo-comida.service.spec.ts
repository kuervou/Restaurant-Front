import { TestBed } from '@angular/core/testing';

import { GrupoComidaService } from './grupo-comida.service';

describe('GrupoComidaService', () => {
  let service: GrupoComidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoComidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
