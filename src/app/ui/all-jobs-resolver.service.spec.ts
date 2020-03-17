import { TestBed } from '@angular/core/testing';

import { AllJobsResolverService } from './all-jobs-resolver.service';

describe('AllJobsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllJobsResolverService = TestBed.get(AllJobsResolverService);
    expect(service).toBeTruthy();
  });
});
