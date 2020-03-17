import { TestBed } from '@angular/core/testing';

import { JobDetailResolverService } from './job-detail-resolver.service';

describe('JobDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobDetailResolverService = TestBed.get(JobDetailResolverService);
    expect(service).toBeTruthy();
  });
});
