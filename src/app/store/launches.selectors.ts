import { createFeatureSelector, createSelector } from '@ngrx/store';
import { find } from 'lodash';
import { Launch } from '../models/launch.model';

export const selectLaunchesFeature =
  createFeatureSelector<Launch[]>('launches');

export const selectLaunches = createSelector(
  selectLaunchesFeature,
  (state: Launch[]) => state
);

export const selectLauch = (id: number) =>
  createSelector(selectLaunches, (launches) => {
    const launch = launches.find((lauch: Launch) => lauch.flight_number === id);
    return launch ? launch : {};
  });
