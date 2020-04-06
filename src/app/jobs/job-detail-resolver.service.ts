import { JobService } from './job.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/models/states/app.state.model';
import { loadJob } from '../shared/actions/singleJob.actions';

@Injectable({
  providedIn: 'root'
})
export class JobDetailResolverService implements Resolve<any> {

  constructor(private jobService: JobService, private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log("jobid", route.paramMap.get('jobId'))
    this.store.dispatch(loadJob({ id: route.paramMap.get('jobId')}))
    // return this.jobService.getJobById(route.paramMap.get('id'))
  }
}
