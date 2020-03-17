import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { ApplicationdetailComponent } from './applicationdetail/applicationdetail.component';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { ApplicationsGuard } from '../auth/ApplicationGuard.service';

@NgModule({
  declarations: [
    ApplicationdetailComponent,
    ApplicationlistComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule
  ],
  providers: [
    ApplicationsGuard
  ]
})
export class ApplicationModule { }
