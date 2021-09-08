import { createReducer, on } from '@ngrx/store';
import { Launch } from '../models/launch.model';
import * as Launchs from './launches.actions';

export const initialState: ReadonlyArray<Launch> = [];
export const reducer = createReducer(
  initialState,
  on(Launchs.AddLaunchAction, (state, { launch }) => {
    return [...state, launch];
  })
);
