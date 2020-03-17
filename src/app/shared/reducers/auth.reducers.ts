import { createReducer, on, Action } from "@ngrx/store";
import { AuthUserState, ProfileState } from '../models/states/auth.state.model';
import  *  as AuthActions from "../actions/auth.actions";



export const initialState: AuthUserState = {
    user: null,
    loading: false,
    error: undefined
};

export const initProfState: ProfileState = {
    userProfile: null,
    loading: false,
    error: undefined
}


const _authReducer = createReducer(
    initialState,
    on(AuthActions.loggedInUserLoad, state => ({ ...state, loading: true, error: null  })),
    on(AuthActions.loggedInUserFail, (state, { error }) => ({ ...state, loading: false, error })),
    on(AuthActions.loggedInUser, (state, { user }) => ({ ...state, loading: false, error: null, user }))
)

const _authUserProfileReducer = createReducer(
    initProfState,
    on(AuthActions.userProfileLoad, state => ({ ...state, loading: true, error: null })),
    on(AuthActions.userProfileLoaded, (state, { payload }) => ({ ...state, loading: false, userProfile: payload, error: null })),
    on(AuthActions.userProfileFail, (state, { error }) => ({ ...state, loading: false, userProfile: null, error: error }))
)


export function reducer(state: AuthUserState | undefined, action: Action) {
    return _authReducer(state, action);
}

export function profileReducer(state: ProfileState | undefined, action: Action) {
    return _authUserProfileReducer(state, action)
}