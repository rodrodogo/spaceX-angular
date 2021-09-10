import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { LaunchesListComponent } from './launches-list.component';
import { of } from 'rxjs';
import { LaunchesService } from 'src/app/services/launches.service';
import { launchesMock } from 'src/assets/mocks/launchMock';

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;
  const initialState = {};
  let launchesService: LaunchesService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LaunchesListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    launchesService = TestBed.inject(LaunchesService);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('storeLaunches should store a new launch',async () => {

    spyOn(launchesService, 'getLaunches').and.returnValue(of(launchesMock));
    component.storeLaunches();


    // component.listLaunch.subscribe((launches: Launch[]) => {
    // })

    // component.storeLaunches();
    // component.storeLaunches();
    // component.storeLaunches();
    
  });

  it('should return a object ', () => {
    
    const expected = cold('(a|)', { a: launchesMock });
    store.setState({ launchesMock });
    
    expect(component.listLaunch).toBeObservable(expected);
  });
});
