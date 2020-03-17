import { JobsState, SingleJobState } from './job.states';
import { AuthUserState, ProfileState } from './auth.state.model';


export interface AppState {
    readonly jobs : JobsState
    readonly job: SingleJobState
    readonly authUser: AuthUserState
    readonly authUserProfile: ProfileState
}