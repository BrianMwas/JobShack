import { NbAuthService } from '@nebular/auth';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { Profile } from '../shared/models/profile';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/models/states/app.state.model';
import { loggedInUserLoad, userProfileLoad } from '../shared/actions/auth.actions';
import { AuthUserState } from '../shared/models/states/auth.state.model';



@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Profile> {
  userId: string
  constructor(private store: Store<AppState>, private userService: UserService, private authService: NbAuthService, private router: Router) { 
    this.authService.onTokenChange()
    .subscribe(res => {
      this.userId = res['userId']
    })
  }
  

  resolve(): Observable<any> {
    this.store.dispatch(loggedInUserLoad({ userId: this.userId }))
    this.store.dispatch(userProfileLoad({ userId: this.userId }))

    return of({ profile: this.store.select(store => store.authUserProfile), authUser:this.store.select(store => store.authUser)})
  }
}
