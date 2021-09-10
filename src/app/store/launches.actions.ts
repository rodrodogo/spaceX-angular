import { Action, createAction, props } from '@ngrx/store';
import { Launch } from '../models/launch.model';

export const ADD_LAUNCH = '[Launch Component] Add';
export const EDIT_LAUNCH = '[Launch Component] Edit';

export const AddLaunchAction = createAction(
  ADD_LAUNCH,
  props<{launch: Launch}>()
);

export const EditLaunchAction = createAction(
  EDIT_LAUNCH,
  props<{newLaunch: Launch}>()
);