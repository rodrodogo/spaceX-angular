import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { provideMockActions } from '@ngrx/effects/testing';
import { LaunchesService } from "../services/launches.service";
import { launchesMock } from "src/assets/mocks/launchMock";
import { LaunchesEffects } from "../store/launches.effects";
import { Launch } from "../models/launch.model";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { LoadLaunchesSuccess, LOAD_LAUNCH } from "./launches.actions";

class MockLaunchService {
    getLaunches() {
        return of(launchesMock);
    }
}

describe('LaunchesEffects', () => {
    let actions$ = new Observable<Action>();
    let service: LaunchesService;
    let effects: LaunchesEffects;
    let store: MockStore<Launch>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LaunchesEffects,
                provideMockStore({ }),
                provideMockActions(() => actions$),
                { provide: LaunchesService, useClass: MockLaunchService },
            ],
        });
        effects = TestBed.inject(LaunchesEffects);
        store = TestBed.inject(MockStore);
        service = TestBed.inject(LaunchesService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('onloadLaunches$', () => {
        it('should return all the launches calling the service LauncService', (done) => {
            const spy = spyOn(service, 'getLaunches').and.callThrough();
            actions$ = of({ type: LOAD_LAUNCH });
            effects.loadLaunches$.subscribe((res) => {
                expect(res).toEqual(LoadLaunchesSuccess({ launches: launchesMock }));
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            });
        });
    });
});



