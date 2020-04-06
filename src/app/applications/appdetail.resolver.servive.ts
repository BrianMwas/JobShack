
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApplicationService } from './application.service';
import { mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { AuthState } from '../auth/model/auth.states.model';
import { Store } from '@ngrx/store';
import { loadSingleApplication } from '../auth/actions/application.actions';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDetailResolverService implements Resolve<any> {

  constructor(private store: Store<AuthState>, private applicationService: ApplicationService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    // console.log("yes", route.paramMap.get('applicationId'))
    this.store.dispatch(loadSingleApplication({ applicationId: route.paramMap.get('applicationId') }))
        
    }
}