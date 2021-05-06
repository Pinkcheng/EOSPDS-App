import { TestBed } from '@angular/core/testing';

import { AlterService } from './alter.service';

describe('AlterService', () => {
  let service: AlterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
