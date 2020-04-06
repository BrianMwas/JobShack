
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApplicationService } from './application.service';
import { mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { AuthState } from '../auth/model/auth.states.model';
import { Store } from '@ngrx/store';
import { loadApplications } from '../auth/actions/application.actions';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsResolverService implements Resolve<any> {

  constructor(private store: Store<AuthState>, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log("yes", route.paramMap.get('jobId'))
    this.store.dispatch(loadApplications({ payload: route.paramMap.get('jobId') }))
  }
}