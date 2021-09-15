import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../store/launches.reducer';

import { DetailGuard } from './detail.guard';

describe('DetailGuardGuard', () => {
  let guard: DetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    guard = TestBed.inject(DetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
