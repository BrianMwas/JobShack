import { AllJobsResolverService } from './all-jobs-resolver.service';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeComponent } from './home/home.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { CategoryResultsComponent } from './category-results/category-results.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {
      title: 'Home',
      animation: 'auth'
    }
  },
  {
    path: 'categories',
    component: CategoryResultsComponent
  },
  {
    path: 'home',
    component: homeComponent,
    resolve: {
      jobs: AllJobsResolverService
    },
    data: { title: 'JobShack | Home', animation: 'auth' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'JobShack | About Us', animation: 'auth' }
  },
  {
    path: 'contact-us',
    component: ContactComponent,
    data: { title: 'JobShack | Contact Us', animation: 'auth' }
  }, 
  {
    path: 'search',
    component: SearchresultsComponent,
    data: { title: 'Jobshack | Search' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UisRoutingModule { }
