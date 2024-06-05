import { TestBed } from '@angular/core/testing';

import { ApiResponseToastrService } from './api-response-toastr.service';

describe('ApiResponseToastrService', () => {
  let service: ApiResponseToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiResponseToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
