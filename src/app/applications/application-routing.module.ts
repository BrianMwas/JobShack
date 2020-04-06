import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { ApplicationdetailComponent } from './applicationdetail/applicationdetail.component';
import { AuthGuard } from '../auth-guard.service';
import { ApplicationsGuard } from '../auth/ApplicationGuard.service';
import { ApplicationsResolverService } from './applications.resolver.service';
import { ApplicationDetailResolverService } from './appdetail.resolver.servive';


const routes: Routes = [
  {
    path: 'applications/:jobId',
    component: ApplicationlistComponent,
    canActivate: [AuthGuard, ApplicationsGuard],
    resolve: {
      applications: ApplicationsResolverService
    }
  },
  {
    path: 'application/detail/:applicationId',
    component: ApplicationdetailComponent,
    canActivate: [AuthGuard, ApplicationsGuard],
    resolve: {
      application: ApplicationDetailResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
