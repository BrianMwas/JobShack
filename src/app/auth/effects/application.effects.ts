import { ApplicationService } from 'src/app/applications/application.service';
import { createEffect, Actions, ofType } from "@ngrx/effects"
import { Injectable } from '@angular/core';
import * as fromAppActions from "../actions/application.actions"
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Application } from 'src/app/shared/models/application';


@Injectable()
export class ApplicationEffect {
    loadApplications$ = createEffect(() => this.actions$.pipe(
        ofType(fromAppActions.loadApplications),
        switchMap(action => {
            console.log("a", action);
            
           return this.applicationService.getAllJobApplications(action.payload).pipe(
               map(res => fromAppActions.applicationsLoaded({ payload: res.data })),
               catchError(error => of(fromAppActions.applicationLoadFail({ error: error['error']['message'] })))
           )
       })
    ))


    loadApplication$ = createEffect(() => this.actions$.pipe(

        ofType(fromAppActions.loadSingleApplication),
        mergeMap(actions =>{

            console.log("Single app load", actions);
            
            return this.applicationService.getApplicationDetail(actions.applicationId)
            .pipe(
                tap(res => { console.log("ppp", new Application(res.data));
                 }),
                map(res => fromAppActions.loadSingleApplicationSuccessful({ application: new Application(res.data) })),
                catchError(error => of(fromAppActions.loadinSingleApplicationFailed({ error })))
            )
        })
    ))

    constructor(private applicationService: ApplicationService, private actions$: Actions) {}
}