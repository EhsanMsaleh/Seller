/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthSellerService } from './authSeller.service';

describe('Service: AuthSeller', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSellerService]
    });
  });

  it('should ...', inject([AuthSellerService], (service: AuthSellerService) => {
    expect(service).toBeTruthy();
  }));
});
