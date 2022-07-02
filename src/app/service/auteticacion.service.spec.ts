import { TestBed } from '@angular/core/testing';

import { AuteticacionService } from './auteticacion.service';

describe('AuteticacionService', () => {
  let service: AuteticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuteticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
