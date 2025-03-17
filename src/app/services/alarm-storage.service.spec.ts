import { TestBed } from '@angular/core/testing';

import { AlarmStorageService } from './alarm-storage.service';

describe('AlarmStorageService', () => {
  let service: AlarmStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
