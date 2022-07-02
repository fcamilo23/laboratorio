import { TestBed } from '@angular/core/testing';

import { PreviaService } from './previa.service';

describe('PreviaService', () => {
  let service: PreviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
