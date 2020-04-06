import { User } from 'src/app/shared/models/user';
import { Profile } from 'src/app/shared/models/profile';
import { ApplicationsState, SingleApplicationState } from './states/application.state';


export interface AuthState {
    readonly applications: ApplicationsState,
    readonly application: SingleApplicationState
}