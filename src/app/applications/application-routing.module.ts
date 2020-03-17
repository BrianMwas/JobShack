import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { ApplicationdetailComponent } from './applicationdetail/applicationdetail.component';
import { AuthGuard } from '../auth-guard.service';
import { ApplicationsGuard } from '../auth/ApplicationGuard.service';

const routes: Routes = [
  {
    path: 'applications',
    component: ApplicationlistComponent,
    // canActivate: [AuthGuard, ApplicationsGuard]
  
  },
  {
    path: 'applications/details',
    component: ApplicationdetailComponent,
    // canActivate: [AuthGuard, ApplicationsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
