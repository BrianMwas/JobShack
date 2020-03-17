import { JobModule } from './../jobs/job.module';
import {
  NbSelectModule,
  NbCardModule,
  NbButtonModule,
  NbSearchModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbContextMenuModule,
  NbActionsModule,
  NbUserModule,
  NbAccordionModule
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UisRoutingModule } from './uis-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { homeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidenav/sidebar.component';
import { NavigationComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { FilestackModule } from '@filestack/angular';
import { NgxPaginationModule } from "ngx-pagination";
import { CategoryResultsComponent } from './category-results/category-results.component'

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    homeComponent,
    FooterComponent,
    SidebarComponent,
    NavigationComponent,
    PageNotFoundComponent,
    SearchresultsComponent,
    CategoryResultsComponent,
  
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    UisRoutingModule,
    FormsModule,
    FilestackModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbSearchModule,
    NbIconModule,
    NbInputModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbContextMenuModule,
    NbAccordionModule,
    JobModule,
  
  ],
  exports: [
    SidebarComponent,
    FlexLayoutModule,
    NavigationComponent,
    FooterComponent
  ]
})
export class UisModule { }
