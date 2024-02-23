import { TestBed } from '@angular/core/testing';

import { EstadoCompartidoService } from './estado-compartido.service';

describe('EstadoCompartidoService', () => {
  let service: EstadoCompartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCompartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
