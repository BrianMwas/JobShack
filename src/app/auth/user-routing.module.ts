import { NewCompanyComponent } from './new-company/new-company.component';
import { AuthGuard } from './../auth-guard.service';

import { AfterFirstLoginComponent } from './after-first-login/after-first-login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component"
import { DashboardComponent } from "./dashboard/dashboard.component"

import { CompanyComponent } from './company/company.component';
import { UserResolverService } from './user-resolver.service';
import { JobcreateComponent } from '../jobs/jobcreate/jobcreate.component';
import { JobDetailResolverService } from '../jobs/job-detail-resolver.service';
import { CompanyResolverService } from './company.resolver.service';


const routes: Routes = [
  {
    path: "dashboard",
		component: DashboardComponent,
		canActivate: [AuthGuard],
		resolve: {
			company: CompanyResolverService
		},
    	data: { title: "Job Shack | Dashboard" },
	},
	{
		path: 'create-profile',
		component: AfterFirstLoginComponent,
		resolve: {
			userData: UserResolverService
		},
		canActivate: [AuthGuard]
	},
	{
		path: 'create-company',
		component: NewCompanyComponent,
		canActivate: [AuthGuard],
		resolve: {
			userData: UserResolverService
		}
	},
	{
		path: 'job/:companyId/update/:jobId',
		component: JobcreateComponent,
		canActivate: [AuthGuard],
		resolve: {
			jobDetail: JobDetailResolverService
		}
	}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule { }
