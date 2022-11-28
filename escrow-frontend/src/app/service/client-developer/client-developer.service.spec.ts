import { TestBed } from '@angular/core/testing';

import { ClientDeveloperService } from './client-developer.service';

describe('ClientDeveloperService', () => {
  let service: ClientDeveloperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDeveloperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
