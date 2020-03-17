import { createReducer, on, Action } from "@ngrx/store";
import * as JobActions from '../actions/joblist.actions';
import * as SingleJobActions from "../actions/singleJob.actions";
import { JobsState, SingleJobState } from '../models/states/job.states';

export const initialState: JobsState = {
    jobs: [],
    loading: false,
    error: undefined
};

export const singleJobInitialState: SingleJobState = {
    job: null,
    loading: false,
    error: undefined
}




const _jobsReducer = createReducer(
    initialState,
    on(JobActions.AllJobs, (state, { payload }) => ({ ...state, jobs: payload, loading: false, error: null })),
    on(JobActions.AllJobsLoading, state => ({ ...state, loading: true, error: null}))
)



const _singleJobReducer = createReducer(
    singleJobInitialState,
    on(SingleJobActions.loadJob, state => ({ ...state, loading: true, error: null })),
    on(SingleJobActions.loadJobFailed, (state, { error }) => ({ ...state, loading: false, error })),
    on(SingleJobActions.jobLoaded, (state, { job }) => ({ ...state, loading: false, job, error: null }))
)

export function reducer(state: JobsState | undefined, action: Action) {
    return _jobsReducer(state, action);
}

export function jobReducer(state: SingleJobState | undefined, action: Action) {
    return _singleJobReducer(state, action);
}