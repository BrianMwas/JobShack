import { createReducer, on, Action } from "@ngrx/store";
import { Application } from 'src/app/shared/models/application';
import * as fromAppActions from "../actions/application.actions";
import { ApplicationsState, SingleApplicationState } from "../model/states/application.state"


const initialApplicationsState: ApplicationsState = {
    applications: [],
    loading: false,
    error: undefined
}


const initialSingleApplication: SingleApplicationState = {
    application: null,
    loading: false,
    error: undefined
}

const _applicationReducer = createReducer(
    initialApplicationsState,
    on(fromAppActions.loadApplications, state => {
        return ({ ...state, loading: true, error: null });
    }),
    on(fromAppActions.applicationsLoaded, (state, { payload }) => ({ ...state, loading: false, error: null, applications: payload })),
    on(fromAppActions.applicationLoadFail, (state, { error }) => ({ ...state, loading: false, error })),
   
)

const _singleApplicationReducer = createReducer(
    initialSingleApplication,
    on(fromAppActions.loadSingleApplication, state => ({ ...state, loading: true, error: null })),
    on(fromAppActions.loadSingleApplicationSuccessful, (state, { application }) => ({ ...state, loading: false, error: null, application })),
    on(fromAppActions.loadinSingleApplicationFailed, (state, { error }) => ({ ...state, loading: false, application: null, error }))
);

export const ApplicationsFeatureKey ='Applications'

export function applicationsReducer(state: ApplicationsState | undefined, action: Action) {
    return _applicationReducer(state, action)
}

export function singleApplicationReducer(state: SingleApplicationState | undefined, action: Action) {
    return _singleApplicationReducer(state, action)
}