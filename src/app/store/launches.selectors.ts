import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Launch } from '../models/launch.model';

export const selectLaunchesFeature =
createFeatureSelector< Launch[]>('launches');

export const selectLaunches = createSelector(
  selectLaunchesFeature,
  (state: Launch[]) => state
);
