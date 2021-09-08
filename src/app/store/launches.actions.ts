import { Action, createAction, props } from '@ngrx/store';
import { Launch } from '../models/launch.model';

export const ADD_LAUNCH = '[Launch Component] Add';

export const AddLaunchAction = createAction(
  ADD_LAUNCH,
  props<{launch: Launch}>()
);