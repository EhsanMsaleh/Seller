import { TestBed } from '@angular/core/testing';

import { OrderLangService } from './order-lang.service';

describe('OrderLangService', () => {
  let service: OrderLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
