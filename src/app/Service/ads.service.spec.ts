import { TestBed } from '@angular/core/testing';

import { ADSService } from './ads.service';

describe('ADSService', () => {
  let service: ADSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ADSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
