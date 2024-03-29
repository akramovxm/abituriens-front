import { TestBed } from '@angular/core/testing';

import { VerifyDialogService } from './verify-dialog.service';

describe('VerifyDialogService', () => {
  let service: VerifyDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
