import { TestBed } from '@angular/core/testing';

import { GlobalCategoryService } from './global-category.service';

describe('ProductStorageService', () => {
  let service: GlobalCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
