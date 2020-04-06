import { Injectable } from '@angular/core';
import { JobService } from 'src/app/jobs/job.service';
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as featureActions from "../actions/joblist.actions"
import * as JobActions from "../actions/singleJob.actions";
import { concatMap, tap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class JobEffects {

    loadJobs$ = createEffect(() => this.actions$.pipe(
        ofType(featureActions.AllJobsLoading),
        concatMap(() => this.jobService.getJobs()
            .pipe(
                map(res => featureActions.AllJobs({ payload: res.data })),
                catchError(error => of(featureActions.AllJobsFailure({ payload: error})))
            )
        )
    ))

    loadJob$ = createEffect(() => this.actions$.pipe(
        ofType(JobActions.loadJob),
        switchMap(({ id }) => {
            return this.jobService.getJobById(id).pipe(
                tap(res => console.log("res job", res)),
                map(res => JobActions.jobLoaded({ job: res.data })),
                catchError(err => of(JobActions.loadJobFailed(err)))
            )
        })
        
    ))

    constructor (private jobService: JobService, private actions$ : Actions) {}
}