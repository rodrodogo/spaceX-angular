import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LaunchesService } from './launches.service';

describe('LaunchesService', () => {
  let service: LaunchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LaunchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
