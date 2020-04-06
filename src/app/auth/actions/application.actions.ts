import { createAction, props } from '@ngrx/store';
import { Application } from 'src/app/shared/models/application';


export enum ApplicationActionTypes {
    APPLICATION_LOADING = '[APPLICATIONS] Getting all applications',
    APPLICATIONS_LOAD_FAIL = '[APPLICATIONS] Application load failed',
    APPLICATIONS_LOADED = '[APPLICATIONS] Get all applications',
    SINGLE_APPLICATION_LOADING = '[APPLICATION] Loading application',
    SINGLE_APPLICATION_LOADED = '[APPLICATION] Single Application loaded',
    SINGLE_APPLICATION_FAIL = '[APPLICATION] Single application load failed'
}


export const loadApplications = createAction(ApplicationActionTypes.APPLICATION_LOADING, props<{ payload: string }>());
export const applicationsLoaded = createAction(ApplicationActionTypes.APPLICATIONS_LOADED, props<{ payload: Application[] }>());
export const applicationLoadFail = createAction(ApplicationActionTypes.APPLICATIONS_LOAD_FAIL, props<{ error: string }>());

export const loadSingleApplication = createAction(ApplicationActionTypes.SINGLE_APPLICATION_LOADING, props<{ applicationId: string }>());
export const loadSingleApplicationSuccessful = createAction(ApplicationActionTypes.SINGLE_APPLICATION_LOADED, props<{ application: Application }>());
export const loadinSingleApplicationFailed = createAction(ApplicationActionTypes.SINGLE_APPLICATION_FAIL, props<{ error: Error }>())