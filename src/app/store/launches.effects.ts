import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LaunchesService } from '../services/launches.service';
import { LoadLaunchesSuccess, LOAD_LAUNCH } from './launches.actions';

@Injectable()
export class LaunchesEffects {
  constructor(
    private launchesService: LaunchesService,
    private actions$: Actions
  ) {}

  loadLaunches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_LAUNCH),
      mergeMap(() =>
        this.launchesService.getLaunches().pipe(
          map((launches) => LoadLaunchesSuccess({ launches: launches })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
