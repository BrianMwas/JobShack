import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';
import { Profile } from 'src/app/shared/models/profile';


export enum AuthActionTypes {
    LOAD_USER = '[AUTH] Auth User Loading',
    LOAD_USER_SUCCESS = '[AUTH] User Loaded',
    LOAD_USER_FAILURE = '[AUTH] Auth User load failed',

    LOAD_USER_PROFILE = '[USER_PROFILE] Load User Profile',
    LOAD_USER_PROFILE_SUCCESS = '[USER_PROFILE] Load User Profile Success',
    LOAD_USER_PROFILE_FAILURE = '[USER_PROFILE] Load User Profile Failure'
}

export const loggedInUserLoad = createAction(AuthActionTypes.LOAD_USER, props<{ userId: string }>());
export const loggedInUser = createAction(AuthActionTypes.LOAD_USER_SUCCESS, props<{user: User}>());
export const loggedInUserFail = createAction(AuthActionTypes.LOAD_USER_FAILURE, props<{error: string}>())

export const userProfileLoad = createAction(AuthActionTypes.LOAD_USER_PROFILE, props<{ userId: string }>());
export const userProfileLoaded = createAction(AuthActionTypes.LOAD_USER_PROFILE_SUCCESS, props<{ payload: Profile }>())
export const userProfileFail = createAction(AuthActionTypes.LOAD_USER_PROFILE_FAILURE, props<{ error: string }>())