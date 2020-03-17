import { JobDetailResolverService } from './job-detail-resolver.service';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobcreateComponent } from './jobcreate/jobcreate.component';
import { AuthGuard } from "../auth-guard.service";


const routes: Routes = [
  {
    path: 'job/:id',
    component: JobdetailComponent,
    resolve: {
      singleJob: JobDetailResolverService
    },
    data: { title: "Job Shack | Job" }
  },
  {
    path: 'dashboard/:companyId/jobs/new',
    component: JobcreateComponent,
    data: { title: "JobShack | New Job" },
    canActivate: [AuthGuard]
  }, 
  {
    path: 'dashboard/:companyId/jobs/update/:id',
    component: JobcreateComponent,
    data: { title: 'Update job' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
