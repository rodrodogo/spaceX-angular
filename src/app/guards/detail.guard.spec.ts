import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { launchesMock } from 'src/assets/mocks/launchMock';
import { Launch } from '../models/launch.model';
import { initialState } from '../store/launches.reducer';

import { DetailGuard } from './detail.guard';

describe('DetailGuardGuard', () => {
  let guard: DetailGuard;
  let store: MockStore<Launch[]>;
  const initialState: ReadonlyArray<Launch> = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore( {initialState} )],
    });
    guard = TestBed.inject(DetailGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // describe('canActivate', ()=> {
  //   it('should activate the route because the store have the object searched ', () => {
  //     const urlSe = new UrlSegment('detail/:flight_number', {})
  //     const rute =  new ActivatedRouteSnapshot().paramMap = ;
  //     // UrlSegment {
  //     //   constructor(path: string, parameters: { [name: string]: string; })
      
  //     guard.canActivate( {provide: LaunchesService, useClass: MockLaunchService });
  //   });
  //   it('should redirect because the store dont have the object searched ', () => {

  //   });
  // })

  
});
