import { TestBed } from '@angular/core/testing';

import { Qualification.ServiceService } from './qualification.service.service';

describe('Qualification.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Qualification.ServiceService = TestBed.get(Qualification.ServiceService);
    expect(service).toBeTruthy();
  });
});
