import { createAction, props } from '@ngrx/store';
import { Launch } from '../models/launch.model';

export const ADD_LAUNCH = '[Launch Component] Add';
export const EDIT_LAUNCH = '[Launch Component] Edit';
export const LOAD_LAUNCH = '[Launch Component] Load';
export const LOAD_LAUNCHES_SUCCESS = '[Launch Component] Load Success';

export const AddLaunchAction = createAction(
  ADD_LAUNCH,
  props<{launch: Launch}>()
);

export const EditLaunchAction = createAction(
  EDIT_LAUNCH,
  props<{newLaunch: Launch}>()
);

export const LoadLaunchesSuccess = createAction(
  LOAD_LAUNCHES_SUCCESS,
  props<{launches: Launch[]}>()
);