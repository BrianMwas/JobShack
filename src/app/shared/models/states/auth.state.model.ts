import { User } from '../user';
import { Profile } from '../profile';

export interface AuthUserState {
    user: User,
    loading: boolean,
    error: string
} 

export interface ProfileState {
    userProfile: Profile,
    loading: boolean,
    error: string
}