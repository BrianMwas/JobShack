import { Job } from '../job';

export interface JobsState {
    jobs: Job[],
    loading: boolean,
    error: Error
} 

export interface SingleJobState {
    job: Job,
    loading: boolean,
    error: Error
}