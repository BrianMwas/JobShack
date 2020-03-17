
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { JobcreateComponent } from './jobcreate/jobcreate.component';
import { JoblistComponent } from './joblist/joblist.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSelectModule,
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbAlertModule,
NbTooltipModule } from "@nebular/theme";
import { JobRoutingModule } from './job-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DateAgoPipe } from './date-ago.pipe';

import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [
    JoblistComponent,
    JobcreateComponent,
    JobdetailComponent,
    DateAgoPipe,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule,
    NbAlertModule,
    FroalaViewModule,
    FroalaEditorModule

  ],
  exports: [
    JoblistComponent,
    DateAgoPipe
  ]
})
export class JobModule { }
