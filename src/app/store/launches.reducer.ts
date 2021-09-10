import { createReducer, on } from '@ngrx/store';
import { Launch } from '../models/launch.model';
import * as Launchs from './launches.actions';

export const initialState: ReadonlyArray<Launch> = [];
export const reducer = createReducer(
  initialState,
  on(Launchs.AddLaunchAction, (state, { launch }) => {
    return [...state, launch];
  }),
  on(Launchs.EditLaunchAction, (state, { newLaunch }) => {
    const index = state.findIndex(
      (item) => item.flight_number === newLaunch.flight_number
    );
    const launchItem = state[index];
    const updatedLaunch = {
      ...launchItem,
      ...newLaunch,
    };
    const updatedLaunches = [...state];
    updatedLaunches[index] = updatedLaunch;
    return updatedLaunches;
  })
);
