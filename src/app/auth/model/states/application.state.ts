import { Application } from 'src/app/shared/models/application';

export interface ApplicationsState  {
    applications: Application[],
    loading: boolean,
    error: string
}


export interface SingleApplicationState {
    application: Application,
    loading: Boolean,
    error: Error
}