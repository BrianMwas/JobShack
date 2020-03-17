
import { AuthGuard } from './auth-guard.service';
import { homeComponent } from './ui/home/home.component';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent
} from '@nebular/auth'

const routes: Routes = [
  
 
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
        data: { animation: 'in' }
      },
      {
        path: 'login',
        component: NbLoginComponent,
        data: { title: 'JobShack | Sign In', animation: 'in' }

      },
      {
        path: 'register',
        component: NbRegisterComponent,
        data: { title: 'JobShack | Register' , animation: 'out'}

      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
        data: { title: 'JobShack | Password request', animation: 'in' }

      },
      {
        path: 'password-reset',
        component: NbResetPasswordComponent,
        data: { title: 'JobShack | Password reset', animation: 'out' }
      },
      {
        path: 'logout',
        component: NbLogoutComponent
      }
    ]
  },
  {
     path: '**',
     component: PageNotFoundComponent,
     data: { title: 'Not Found', animation: 'in' }
 },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
