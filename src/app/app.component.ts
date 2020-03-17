import { NbAuthService } from '@nebular/auth';
import { Component, Output } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  @Output()
  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private authService: NbAuthService) { 
    this.authService.isAuthenticated()
    .subscribe(authenticated => {
      this.userLoggedIn.next(authenticated)
    })
   }
}
