import { TestBed } from '@angular/core/testing';

import { QrreaderService } from './qrreader.service';

describe('QrreaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrreaderService = TestBed.get(QrreaderService);
    expect(service).toBeTruthy();
  });
});
