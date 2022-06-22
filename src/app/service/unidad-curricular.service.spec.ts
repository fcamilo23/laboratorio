import { TestBed } from '@angular/core/testing';

import { UnidadCurricularService } from './unidad-curricular.service';

describe('UnidadCurricularService', () => {
  let service: UnidadCurricularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadCurricularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
