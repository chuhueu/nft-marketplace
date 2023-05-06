import { TestBed } from '@angular/core/testing';

import { SalutationService } from './salutation.service';

describe('SalutationService', () => {
  let service: SalutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
