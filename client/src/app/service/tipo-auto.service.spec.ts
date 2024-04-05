import { TestBed } from '@angular/core/testing';

import { TipoAutoService } from './tipo-auto.service';

describe('TipoAutoService', () => {
  let service: TipoAutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
