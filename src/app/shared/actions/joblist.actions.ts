import { createAction, props } from "@ngrx/store";
import { Job } from '../models/job';

export enum JobListActionTypes {
    LOAD_JOBS = '[JOBS] All jobs',
    LOAD_SUCCESS = '[JOBS] Load All Jobs Success',
    LOAD_JOBS_FAILURE = '[JOBS] Load All Jobs Failure'
}

export const AllJobs = createAction(JobListActionTypes.LOAD_SUCCESS, props<{ payload: Job[] }>());
export const AllJobsLoading = createAction(JobListActionTypes.LOAD_JOBS);
export const AllJobsFailure = createAction(JobListActionTypes.LOAD_JOBS_FAILURE, props<{ payload: Error }>())


