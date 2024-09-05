import { TestBed } from '@angular/core/testing';

import { EmployeeSarfUploadService } from './employee-sarf-upload.service';

describe('EmployeeSarfUploadService', () => {
  let service: EmployeeSarfUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeSarfUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
