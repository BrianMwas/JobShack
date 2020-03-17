import { Resolve, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { JobService } from '../jobs/job.service';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/models/states/app.state.model';
import { AllJobsLoading } from '../shared/actions/joblist.actions';
import { loggedInUserLoad, userProfileLoad } from '../shared/actions/auth.actions';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AllJobsResolverService implements Resolve<any> {
  userId: string
  constructor(private jobService: JobService, private store: Store<AppState>, private authService: NbAuthService) { 
    this.authService.onTokenChange()
    .subscribe(res => {
      console.log("res", res)
      this.userId = res.getPayload()['userId']
    })
  }

  async resolve() {
    await this.store.dispatch(AllJobsLoading())
		await this.store.dispatch(loggedInUserLoad({ userId: this.userId }));
    await this.store.dispatch(userProfileLoad({ userId: this.userId }));
    return this.jobService.getJobs().pipe(
      tap(res => console.log("router", res.data)),
      map(res => res.data)
    )
  }
}
