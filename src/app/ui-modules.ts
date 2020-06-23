

// Applications.

import {  StoreDevtoolsModule } from "@ngrx/store-devtools";
import * as fromJobs from '../app/shared/reducers/jobs.reducer';
import * as fromAuth from "../app/shared/reducers/auth.reducers";
import * as fromApplications from "../app/auth/reducers/auth.reducer"
// Nebular Modules
import {
    NbSidebarModule ,
    NbMenuModule,
    NbDatepickerModule,
    NbToastrModule,
    NbDialogModule
} from '@nebular/theme';


import {
  NbSecurityModule
} from "@nebular/security"



// Nebular Auth Modules.
import {
    NbPasswordAuthStrategy,
    NbAuthModule,
    NbAuthJWTToken
} from "@nebular/auth"
import { CommonModule } from '@angular/common';
// import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JobEffects } from './shared/effects/job.effects';
import { AuthEffects } from './shared/effects/auth.effects';
import { ApplicationEffect } from './auth/effects/application.effects';



export const nebular = [
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot()
]

export const angularSpecific = [
    CommonModule
]

export const Store = [
    StoreModule.forRoot({
        jobs:  fromJobs.reducer,
        job: fromJobs.jobReducer,
        authUser: fromAuth.reducer,
        authUserProfile: fromAuth.profileReducer,
        applications: fromApplications.applicationsReducer,
        application: fromApplications.singleApplicationReducer
    }),
    EffectsModule.forRoot([JobEffects, AuthEffects, ApplicationEffect]),
    StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production,
        //Restrict extension to log-only mode
    })
]


export const nBSecurity = [
  NbSecurityModule.forRoot({
    accessControl: {
      seeker: {
        view: [
          'jobdetail',
          'apply',
          'review',
          'comment',
          'addCV'
        ]
      },
      employer: {
        view: [
          'createjob',
          'updatejob',
          'deletejob',
          'createCompany',
          'updateCompany',
          'application-detail',
          'application-list'
        ]
      }
    }
  })
]


// The Password should be imported separately from the auth module, the auth module only will be imported.
export const password = [
    NbPasswordAuthStrategy
]

export const auth = [
    NbAuthModule.forRoot({
        strategies: [
            NbPasswordAuthStrategy.setup({
                // Alias to the strategy to dynamically mention it later. Allows multiple strategy configurations in one app
                name: 'email',
                token: {
                    class: NbAuthJWTToken,
                    key: 'token'
                },
                baseEndpoint: environment.baseUrl,
                login: {
                    endpoint: "auth/login",
                    method: 'post',
                    redirect: {
                        success: "/home", // Redirect to dashboard on successful login
                        failure: null // Stay on the page on failures
                    }
                },
                register: {
                    endpoint: "auth/register",
                    method: 'post',
                    redirect: {
                        success: '/auth/login',
                        failure: null
                    }
                },
                logout: {
                    endpoint: "/auth/logout",
                    method: 'get',
                    redirect : {
                        success: '/',
                        failure: '/'
                    }
                },
                resetPass: {
                    endpoint: "/reset-pass",
                    method: 'post'
                },
                requestPass: {
                  endpoint: "/auth/request-password-change",
                  method: "post"
                },
                messages: {
                    key: 'data.message'
                },
                validation: {
                    fullName: {
                        required: true
                    },
                    password: {
                        regexp: "/(?=.*[a-zA-Z])(?=.*[0-9]+).*/"
                    }
                }
            })
        ]
    })
]
