import { createAction, props } from '@ngrx/store';
import { Job } from '../models/job';



export enum SingleJobActionTypes {
    LOADING_JOB = '[JOB] Loading Job',
    LOADING_JOB_SUCCESSFUL = '[JOB] Loaded Job Successfully',
    LOADING_JOB_FAILED = '[JOB] Loading Job Failed',

    CREATING_JOB = '[JOB] Creating Job',
    CREATED_JOB_SUCCESSFULLY = '[JOB] Created Job Successfully',
    CREATING_JOB_FAILED = '[JOB] Creating Job Failed',


    UPDATE_JOB = '[JOB] Updating Job',
    UPDATED_JOB_SUCCESSFULLY = '[JOB] Job Update Successfull',
    UPDATE_JOB_FAILED = '[JOB] Job Update Failed',

    DELETE_JOB = '[JOB] Deleting job',
    DELETING_JOB_SUCCESSFULL = '[JOB] Job Deleted Successfully',
    DELETE_JOB_FAILED = '[JOB] Delete JOb Failed'
}

export const loadJob = createAction(SingleJobActionTypes.LOADING_JOB, props<{ id: string }>());
export const jobLoaded = createAction(SingleJobActionTypes.LOADING_JOB_SUCCESSFUL, props<{ job: Job }>())
export const loadJobFailed = createAction(SingleJobActionTypes.LOADING_JOB_FAILED,  props<{ error: Error }>());

export const creatingJob = createAction(SingleJobActionTypes.CREATING_JOB);
export const createdJob = createAction(SingleJobActionTypes.CREATED_JOB_SUCCESSFULLY, props<{ payload: Job }>());


