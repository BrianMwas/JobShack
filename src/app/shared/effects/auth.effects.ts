import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { UserService } from 'src/app/auth/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from "../actions/auth.actions"
import { Subject, of } from 'rxjs';
import { concatMap, switchMap, map, catchError, tap } from 'rxjs/operators';

interface PayLoadState {
    userId: string
    iat: Number
    exp: Number
    email: string
}

@Injectable()
export class AuthEffects {

    payload: PayLoadState

    loadAuthUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loggedInUserLoad),
        switchMap(({ userId }) => {
            return this.userService.getAuthUser(userId).pipe(
                map(res => AuthActions.loggedInUser({ user: res.data })),
                catchError(error => of(AuthActions.loggedInUserFail({ error: error['error']['message'] })))
            )
        })
    ))


    loadUserProfile$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.userProfileLoad),
        switchMap(({ userId }) => {
            return this.userService.getUserProfile(userId).pipe(
                map(res => AuthActions.userProfileLoaded({ payload: res.data })),
                catchError(err => of(AuthActions.userProfileFail({ error: err['error']['message'] })))
            )
        })
    ))

    constructor (private userService: UserService, private actions$: Actions) { }
}