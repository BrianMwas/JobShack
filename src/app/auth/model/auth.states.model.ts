import { User } from 'src/app/shared/models/user';
import { Profile } from 'src/app/shared/models/profile';

export interface AuthState {
    readonly authUser: User
    readonly profile: Profile
}